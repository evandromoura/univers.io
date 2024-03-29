export class Graphics{

    constructor(game){
        this.game = game;
    }

    zoom(objects) {
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        if (objects.length > 0) {
            objects.forEach(object => {
                minX = Math.min(minX, object.sprite.x - object.sprite.displayWidth / 2);
                maxX = Math.max(maxX, object.sprite.x + object.sprite.displayWidth / 2);
                minY = Math.min(minY, object.sprite.y - object.sprite.displayHeight / 2);
                maxY = Math.max(maxY, object.sprite.y + object.sprite.displayHeight / 2);
            });
        }    


        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const width = maxX - minX;
        const height = maxY - minY;

        // Define os limites de zoom e o fator de ajuste fino
        const minZoom = 1; // Zoom máximo (mais afastado, mostra mais do mapa)
        const maxZoom = 7.0; // Zoom mínimo (mais próximo, mostra menos do mapa)
        const zoomAdjustmentFactor = 0.5; // Fator de ajuste para adicionar uma margem

        // Determina o nível de zoom necessário para que todos os objetos caibam na tela
        const zoomX = this.game.cameras.main.width / width;
        const zoomY = this.game.cameras.main.height / height;
        let zoomLevel = Math.min(zoomX, zoomY) * zoomAdjustmentFactor;

        // Aplica os limites de zoom
        zoomLevel = Phaser.Math.Clamp(zoomLevel, minZoom, maxZoom);

        // Aplica o zoom e centraliza a câmera nos objetos
        if(zoomLevel){
            console.log('Zoom level 1');
            this.game.cameras.main.setZoom(zoomLevel);
            //this.game.cameras.main.setZoom(0.8);
            this.game.cameras.main.centerOn(centerX, centerY);
        }else{
            console.log('Zoom level 2',zoomLevel);
            this.game.cameras.main.setZoom(1);
        }
    }

}    