class Scene2 extends Phaser.Scene{
    constructor() {
        super('gameplay');
    }

    create ()
    {
        //creación escenario de juego
        this.add.image(400, 300, 'sky');
    
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        platforms.create(0, 450, 'ground');
    
        // jugador, fisicas, animaciones
        player = this.physics.add.sprite(100, 450, 'dude')


        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
    
        
    
        //  Input Events
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
    
        // adición de estrellas
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
            
        });
    
        //intento de adicion de otro grupo de estrellas
        //redstars = this.physics.add.group({ key: 'redstar', repeat: 5, setXY: { x: 12, y: 0, stepX: 110 }
        //})
    
        stars.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15) 
            
            if (Phaser.Math.FloatBetween(0, 1) > 0.5){
                child.score = 15;
                child.setTint(0xff6666);
            } 
            else
            {
                child.score = 10;
            }
        });
    
        bombs = this.physics.add.group();
    
        //  puntaje
        scoreText = this.add.text(600, 16, 'score: 0', { fontSize: '42px Arial', fill: '#2E037A'});
    
        //  Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
    
        //  overlaps
        this.physics.add.overlap(player, stars)

        this.physics.add.overlap(player, stars, this.collectStar, null, this);
    
    
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        
        

        score = 0;
    }

    update ()
    {
        if (gameOver)
        {
            return;
        }
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }
    
    collectStar (player, star)
    { 
        star.disableBody(true, true);
        //  Add and update the score
        score += star.score;
        scoreText.setText('Score: ' + score);
        
        
        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

         var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

         var bomb = bombs.create(x, 16, 'bomb');
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
         bomb.allowGravity = false;
        }
    }
    
    hitBomb (player, bomb)
    {
        this.gameOver()
    }

    gameOver() {        
        gameOver = true;
        
        this.physics.pause();
        
        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Verbena', fontSize: 100, color: '#FFFFFF' })
        //.setInteractive()
        //.on('pointerdown', () => this.reinicio() );
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));  
        
    }

    //reinicio() {
        //this.scene.start('gameplay')
    //}
}

