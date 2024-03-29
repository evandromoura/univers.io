import {Player} from '/src/io/univers/entity/player.js';
import {Graphics} from '/src/io/univers/graphic/graphics.js';
import {Socket} from '/src/io/univers/socket/socket.js';

export class Game extends Phaser.Scene{
    constructor (){
        super({ key: 'game' });
        window.MENU = this;
        this.player;
        this.socket;
        this.pointer;
        this.graphics;
        this.socket;
    }
    preload(){
        this.load.image('earth','/public/assets/img/obj/earth.png');
        this.load.image('milkway','/public/assets/img/bg/milkyway.png');
    }
    create(){
        this.physics.world.setBounds(0, 0, 5000, 5000);
        this.cameras.main.setBounds(0, 0, 5000, 5000);
        this.add.image(0, 0, 'milkway').setOrigin(0, 0).setDisplaySize(5000, 5000);

        this.graphics  = new Graphics(this);

        this.socket = new Socket(this);
        this.socket.connect();
        this.socket.join('MILKWAY');

        this.input.on('pointermove', (pointer) =>{
            this.pointer = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            if(this.player){
                this.player.move(this.pointer);
            }
        });
    }
    update(){
        if(this.player){
            this.player.update(this);
            if(this.player.objects){
                console.log('deu zoom  ');
                this.graphics.zoom(this.player.objects);
            }else{
               // this.scene.cameras.main.setZoom(1);
            }
        }
    }
    
    createMyPlayer(player){
        this.player = new Player(this,'group');
        for(const obj of player.objects){
            this.player.addObject(obj.uid,obj.x,obj.y,obj.mass);
        }
    }
}