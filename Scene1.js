class Scene1 extends Phaser.Scene{
    constructor() {
        super('carga y menu');
    }
     
    
    preload ()
    {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('redstar', 'assets/redstar.png');
        //las estrellas rojas creo que al final no las puedo incorporar, usar comando tint en las estrellas q ya tengo
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48 
        });
    }
    
    create()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        
        var logo = this.add.image(400, 300, 'logo').setScale(0.26)
        logo.setInteractive()
        logo.on('pointerdown', () => this.scene.start('gameplay'));

    }



}