var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Scene1, Scene2]
};

var game = new Phaser.Game(config);

var score;
var gameOver;


var player;
var stars;
var redstars;
var bombs;
var platforms;
var cursors;
var scoreText;
