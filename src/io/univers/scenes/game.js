import {Player} from '/src/io/univers/entity/player.js';
import {Graphics} from '/src/io/univers/graphic/graphics.js';
import {Socket} from '/src/io/univers/socket/socket.js';

export class Game extends Phaser.Scene{
    constructor (){
        super({ key: 'game' });
        window.MENU = this;
        this.player;
        this.players = [];
        this.socket;
        this.pointer;
        this.graphics;
        this.socket;
        this.lastUpdateTime = 0;
        this.updateRate = 1000;
    }
    preload(){
        this.load.image('earth','/public/assets/img/obj/earth.png');
        this.load.image('milkway','/public/assets/img/bg/milkyway.png');
        this.load.atlas('space', '/public/assets/img/space/space.png', '/public/assets/img/space/space.json');

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
                this.player.move(this.pointer,true);
            }
        });
    }
    //61982299966
    update(){
        if(this.player){
            this.player.update(this);
            if(this.player.objects){
                this.graphics.zoom(this.player.objects);
            }else{
               // this.scene.cameras.main.setZoom(1);
            }
            this.updateObjectsToServer();
        }
    }
    
    createMyPlayer(player){
        console.log('Create my player',player);
        this.player = new Player(this,'group');
        this.player.activeroom = player.activeroom;
        this.player.id = player.id;
        for(const obj of player.objects){
            this.player.addObject(obj.uid,obj.x,obj.y,obj.mass);
        }
    }
    createNewPlayer(player){
        let newplayer = new Player(this,'group');
        newplayer.id = player.id;
        newplayer.uid = player.uid;
        for(const obj of player.objects){
            newplayer.addObject(obj.uid,obj.x,obj.y,obj.mass);
        }
        this.players.push(newplayer);
    }
    moveobject(id,uid,pointer){
        let play = this.players.find(player => player.id === id);
        if(play){
            let objectsMove = this.players.find(player => player.id === id).objects;
            if(objectsMove){
                let objectMove = objectsMove.find(obj => obj.uid === uid);
                if(objectMove){
                    objectMove.move(pointer,false);
                }
            }
        }
    }

    updateObjectsToServer(){
        let time = new Date().getTime();
        
        if (time - this.lastUpdateTime > this.updateRate) {
            console.log('Entrou')
            this.socket.updateObjectsToServer(this.player.activeroom, this.player);
            this.lastUpdateTime = time;
        }else{
            console.log('NAOOOO Entrou')
        }
    }

    updatePosition(player){
        let playerr = this.players.find(playr => playr.id === player.id);
        if(playerr && player){
            if(player.objects){
                for(let obj of playerr.objects){
                    let objP = player.objects.find(objPP => objPP.uid === obj.uid);
                    if(objP){
                        obj.sprite.body.x = obj.x;
                        obj.sprite.body.y = obj.y;
                    }
                }
            }
        }
    }

    breakobject(id,uid){
        let play = this.players.find(player => player.id === id);
        if(play){
            let objectsBreak = this.players.find(player => player.id === id).objects;
            if(objectsBreak){
                let objectMove = objectsBreak.find(obj => obj.uid === uid);
                if(objectMove){
                    objectMove.break(objectMove);
                }
            }
        }
    }
    loadPlayers(players){
        if(players){
            players.forEach(player => {
                if(player.id !== this.player.id){
                    this.createNewPlayer(player);
                }
            });
        }
    }

    updateObjetsPosition(player){
        if(this.players){
            let objects = this.players.find(playr => playr.id === player.id);
            if(objects){
                objects.forEach(obj =>{
                    let playerObjs = player.objects.find(objj =>objj.uid === obj.uid);
                    if(playerObjs){
                        playerObjs.sprite.body.x = obj.x;
                        playerObjs.sprite.body.y = obj.y;
                    }
                });
            }
        }
    }


}