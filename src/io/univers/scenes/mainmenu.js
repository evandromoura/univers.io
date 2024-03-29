export class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'mainmenu' });
        window.MENU = this;
    }

    create (){
        console.log('mainmenu...');
        this.scene.start('game');
    }
}