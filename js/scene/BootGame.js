export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.spritesheet("mario", 'assets/mario-spritesheet.png', {
            frameHeight: 41,
            frameWidth: 36,
            spacing: 0.5
        });
        this.load.image('cloud-platform', 'assets/cloud-platform.png');
        this.load.image('brick', 'assets/bricks.jpg');
        this.load.audio('slider','assets/slider.mp3');
    }
    create(){       
        this.scene.start("PlayGame");
    }
}