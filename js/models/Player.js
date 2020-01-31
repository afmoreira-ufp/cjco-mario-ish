export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config){
        super(config.scene,config.x,config.y,'mario');
        this.scene=config.scene;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        config.scene.physics.world.enable(this);
        
        this.jump=0;
        this.body.setMaxSpeed(400);

        //facing attribute to match animations key
        //change with player input
        this.facing='right';
        
        //create animations from the spritesheet
        this.scene.anims.create({
            key: 'left', //should match facing values
            frames: this.scene.anims.generateFrameNumbers('mario', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('mario', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
          key: 'idle',
          frames: this.scene.anims.generateFrameNumbers('mario', { start: 0, end: 0 }),
          frameRate: 10,
          repeat: 0
      });
      this.velocity=200;
      this.acceleration=500;

      this.body.setDragX(300);
    }
/*
    doDash(){
        this.canDash=true; 
      }*/
  
      update(cursors){
          this.checkDirection(cursors);
          this.checkJump(cursors);
      }
  
      checkDirection(cursors){
        
        if (cursors.right.isDown ) {
          this.facing='right';  
        } 
        else if (cursors.left.isDown) {
          this.facing='left';
        } 
        else {
          this.facing='idle';
        }
        this.changeSpeed(cursors);

        //execute animation
        this.play(this.facing, true);
      }
  
      changeSpeed(cursors){
        
        if(cursors.dash.isDown && (cursors.left.isDown||cursors.right.isDown)){
          this.checkDash();
        }else{
          if(this.facing==='right'){
            //this.setVelocityX(this.velocity);
            this.setAccelerationX(this.acceleration);
          }
          else if(this.facing==='left'){          
            //this.setVelocityX(-this.velocity);          
            this.setAccelerationX(-this.acceleration);
          }
          else{
            //this.setVelocityX(0);
            this.body.setAccelerationX(0);
          }
        }
      }
  
      checkJump(cursors){
        //checks if player body is blocked bellow
        if(this.body.blocked.down){
          this.jump=2;
        }
        //isJustDown implemented to allow only one jump at a time (key must be pressed and released)
        if ((this.isJustDown(cursors.up)&&this.jump>0)) {     
          this.jump--;
            this.setVelocityY(this.velocity*-2);
            console.log(this.body.velocity);
          }
      }
  
      checkDash(){        
        if(this.facing==='right'){
          this.body.setAccelerationX(2*this.acceleration); 
        }else if(this.facing==='left'){          
          this.body.setAccelerationX(-2*this.acceleration); 
        } 
      }
      isJustDown(key){
        return Phaser.Input.Keyboard.JustDown(key);
      }
}