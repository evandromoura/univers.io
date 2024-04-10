export class PlayerObject{

    constructor(game,uid,x,y,mass,skin){
        //this.game = game;
        this.uid = uid;
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.cooldown = 100;
        this.skin = skin;
        this.sprite = this.createSprite(game);
    }

    createSprite(game){
        console.log(this.skin);
        let sprite = game.physics.add.sprite(this.x, this.y, this.skin).setScale(this.mass / 1171);
        sprite.setCircle(sprite.width / 2);
        sprite.setCollideWorldBounds(true);
        sprite.setBounce(0);
        return sprite;
    }

    move(game,pointer,local){
        let velocity = 8000 / this.mass ;
        velocity = Math.max(40,velocity);
        velocity = Math.min(100,velocity);
        game.physics.moveToObject(this.sprite,pointer, 700);
        if(local){
            // this.game.socket.moveObject(this.game.player.activeroom,this.game.player.id, this.uid,pointer);
        }
    }

    break(game){
        if(game.pointer){
            let distance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, game.pointer.x, game.pointer.y);
            if (distance < 10) {
                this.sprite.body.setVelocity(0, 0);
                // this.game.socket.breakObject(this.game.player.activeroom,this.game.player.id, this.uid);
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