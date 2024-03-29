export class PlayerObject{

    constructor(game,uid,x,y,mass){
        this.game = game;
        this.uid = uid;
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.cooldown = 100;
        this.sprite = this.createSprite();
    }

    createSprite(){
        let sprite = this.game.physics.add.sprite(this.x, this.y, 'earth').setScale(this.mass / 1171);
        sprite.setCircle(sprite.width / 2);
        sprite.setCollideWorldBounds(true);
        sprite.setBounce(1);
        return sprite;
    }

    move(pointer){
        // console.log(this.sprite);
        this.sprite.body.setVelocity(10);
        let velocity = 200;
        this.game.physics.moveToObject(this.sprite,pointer, velocity);
    }
    break(game){
        if(game.pointer){
            let distance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, game.pointer.x, game.pointer.y);
            if (distance < 10) {
                this.sprite.body.setVelocity(0, 0);
            }
        }
    }

    toJson(){
        return {
            uid:this.uid,
            x:this.x,
            y:this.y,
            mass:this.mass
        }
    }

}