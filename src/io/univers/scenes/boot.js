export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'boot' });
    }

    preload ()
    {
       
    }

    create ()
    {
        console.log('Boot...');
        this.scene.start('mainmenu');
    }
}