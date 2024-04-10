export class Socket{
    constructor (game){
        this.game = game;
        this.socket;
    }

    connect(){
        this.socket = io('http://localhost:3000',{ transports : ['websocket'] });
        
        this.socket.on('message', (message) => {});

        this.socket.on('login_success', (player) => {
            // console.log('Login Success...');
            this.game.player = player;
        });

        this.socket.on('join_success', (player) => {
            // console.log('Chegou no join sucess');
            this.game.createMyPlayer(player);
        });

        this.socket.on('newplayer', (player) => {
            // console.log('Criou um novo player');
            this.game.createNewPlayer(player);
        });

        this.socket.on('moveobject', (id,uid,pointer,velocity) => {
            // console.log('Moveu o objeto');
            this.game.moveobject(id,uid,pointer,velocity);
        });

        this.socket.on('breakobject', (id,uid,pointer) => {
            this.game.breakObject(id,uid,pointer,velocity);
        });

        this.socket.on('loadplayers', (players) => {
            // console.log('Carregou todos os players');
            this.game.loadPlayers(players);
        });

        this.socket.on('updatepositionplayer', (player) => {
             this.game.updatePosition(player);
        });

        this.socket.on('disconnectplayer', (id) => {
            let indexPlayerDisconnect = this.game.players.find(player => player.id === id);
            if(indexPlayerDisconnect !== -1){
                let playerDisconnect = this.game.players[indexPlayerDisconnect];
                if(playerDisconnect){
                    if(playerDisconnect.objects){
                        playerDisconnect.objects.forEach((obj,index) => {
                            obj.sprite.destroy();
                            playerDisconnect.objects.splice(index);
                        });
                    }
                }
            }
        });
    }

    join(room){
        this.socket.emit('join',room);
    }

    moveObject(room,id,uid,pointer){
        this.socket.emit('moveobject',room,id,uid,pointer);
    }

    breakObject(room,id,uid){
        this.socket.emit('breakobject',room,id,uid);
    }

    updateObjectsToServer(room,player){
        console.log('Entrou aqui no socket: ',this.socket,room,player);
        //this.socket.emit('updatePosition',room,player);
        let param = {room:room,player:player};
        this.socket.emit('updatePosition',room);
    }
}        