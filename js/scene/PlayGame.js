import Player from '../models/Player.js';

export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    create() {
        console.log("this is my awesome game");
        this.width = 4096;
        this.height = 1024;

        this.player = new Player({ scene: this, x: 100, y: 100 });
        this.cursors = this.input.keyboard.createCursorKeys();
        //insert a new key to cursors object
        this.cursors.dash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //configure scene camera to follow the play until a given dimension
        this.cameras.main.setBounds(0, 0, this.width, this.height);
        this.cameras.main.startFollow(this.player);

        //create a static group for clouds/platforms
        var clouds = this.physics.add.staticGroup();

        var walls = this.physics.add.staticGroup();
        this.soundtrack = this.sound.add('slider');
        //this.soundtrack.play();

        for (var i = 0; i < 100; i++) {
            let wall = walls.create(0, 256 / 4 * i, 'brick').setScale(0.25).refreshBody();
            wall.body.checkCollision.up = false;
            wall.body.checkCollision.down = false;
        }
        for (var i = 0; i < 20; i++) {
            var cloud = clouds.create(128 * i, this.height - 20, 'cloud-platform');

            this.disableCollisionsExceptAbove(cloud);
            if (i % 2 == 0) {
                cloud = clouds.create(128 * i, this.height - 220, 'cloud-platform');
                this.disableCollisionsExceptAbove(cloud);
            }
            if (i % 4 == 0) {
                cloud = clouds.create(128 * i, this.height - 420, 'cloud-platform');
                this.disableCollisionsExceptAbove(cloud);
            }
            if (i % 8 == 0) {
                cloud = clouds.create(128 * i, this.height - 620, 'cloud-platform');
                this.disableCollisionsExceptAbove(cloud);
            }
        }

        this.physics.add.collider(this.player, clouds);
        this.physics.add.collider(this.player, walls);
    }

    //disable all collisions except from above
    disableCollisionsExceptAbove(platform) {
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
    }

    update() {
        this.player.update(this.cursors);
    }
}