import {Boot} from '/src/io/univers/scenes/boot.js';
import {MainMenu} from '/src/io/univers/scenes/mainmenu.js';
import {Game} from '/src/io/univers/scenes/game.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true
        }
    },
    scene: [ Boot, MainMenu, Game]
};

const main = new Phaser.Game(config);