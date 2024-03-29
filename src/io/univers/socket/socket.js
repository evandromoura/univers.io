export class Socket{
    constructor (game){
        this.game = game;
        this.socket;
    }

    connect(){
        this.socket = io('http://localhost:3000',{ transports : ['websocket'] });
        
        this.socket.on('message', (message) => {});

        this.socket.on('login_success', (player) => {
            console.log('Login Success...');
            this.game.player = player;
        });

        this.socket.on('join_success', (player) => {
            console.log('Chegou no join sucess');
            this.game.createMyPlayer(player);
        });
    }

    join(room){
        this.socket.emit('join',room);
    }
}        