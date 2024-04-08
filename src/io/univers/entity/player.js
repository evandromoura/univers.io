import {PlayerObject} from '/src/io/univers/entity/playerobject.js';

export class Player{

    constructor(game,group){
        this.id;
        this.game = game;
        this.group = group;
        this.objects = [];
        this.uid = '';
        this.skin = 'earth';
        this.activeroom;
    }

    addObject(uid,x,y,mass){
        console.log('Skin no player', this.skin);
        console.log('UID no player', uid);
        let obj = new PlayerObject(this.game,uid,x,y,mass,this.skin);
        this.objects.push(obj);
        return obj;
    }

    shoot(x,y){
    }

    move(point,local){
        for(const obj of this.objects){
            obj.move(point,local);
        }
    }
    break(point){
        for(const obj of this.objects){
            obj.break(point);
        }
    }

    checkCollisionsMyObjects() {
        if(this.objects.length > 0){
            
            let objects = this.objects;
            for (let i = 0; i < objects.length; i++) {
                
                if(objects[i].cooldown > 0){
                    
                    for (let j = i + 1; j < objects.length; j++) {
                        if(objects[i] !== objects[j]){
                            if(objects[j].cooldown > 0){
                                let obj1 = objects[i].sprite;
                                let obj2 = objects[j].sprite;
                                let dx = obj2.x - obj1.x;
                                let dy = obj2.y - obj1.y;
                                let distance = Math.sqrt(dx * dx + dy * dy);
                                let minDistance = objects[i].mass / 2 + objects[j].mass / 2;
                                if (distance < minDistance) {
                                
                                    let overlap = minDistance - distance;
                    
                                    // Calcula a direção do ajuste
                                    let adjustX = (dx / distance) * overlap / 2; // Divide por 2 para ajustar ambos objetos igualmente
                                    let adjustY = (dy / distance) * overlap / 2;
                    
                                    // Aplica o ajuste nos objetos para resolver a sobreposição
                                    obj1.x -= adjustX;
                                    obj1.y -= adjustY;
                                    obj2.x += adjustX;
                                    obj2.y += adjustY;
                                }
                            }    
                        
                        }
                    }
                }
                
            }
        }
        
    }
    update(game){
        this.break(game);
        // this.verifyColideObjects(game);
        this.checkCollisionsMyObjects();
    }

    toJson(){
        return {
            id:this.id,
            uid:this.uid,
        }
    }

}