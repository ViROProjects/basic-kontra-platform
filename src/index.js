import { init, Sprite, GameLoop, initKeys, keyPressed } from 'kontra';

let arrs = [];
let bads = [];
let yess = [];
let victor =[];

initKeys();

class Player extends Sprite.class {
    constructor(a) {
        super(a)
        this.onGround = false;
        this.life = 3;
        this.score = 0;
        this.initial = this.position;
        this.finish = false;
        this.victory = false;
    }
    update() {
        if(!this.finish){
            this.dx = 0;
            this.dy = this.dy < 5 ? this.dy + 1 : 5;
            if (victor.filter(x => this.collidesWith(x)).length) {
                this.finish = true;
                this.victory = true;
            }
    
            if (bads.filter(x => this.collidesWith(x)).length) {
                if (this.life > 0) {
                    this.position = this.initial;
                    this.life -= 1;
                }
                else{
                    this.finish = true;
                }
            }
    
            if (yess.filter(x => this.collidesWith(x)).length) {
                this.score += yess.filter(x => this.collidesWith(x)).length;
                yess = yess.filter(x => !this.collidesWith(x));
            }
    
            if (keyPressed('left')) {
                this.dx = -2.6;
            }
            else if (keyPressed('right')) {
                this.dx = 2.6;
            }
    
            if (keyPressed('up') && this.onGround) {
                this.dy = -10;
                this.onGround = false;
            }
            else if (arrs.filter(x => this.collidesWith(x)).length) {
                this.dy = 0;
                this.y = arrs.filter(x => this.collidesWith(x))[0].y - this.height;
                this.onGround = true;
            }
            this.advance();
        }
    }
}

class MyClass {
    constructor() {
        let { canvas, context } = init();
        let sprite = new Player({
            x: 0,
            y: 80,
            color: 'blue',
            width: 20,
            height: 20,
            anchor: { x: 0, y: 0 }
        });
        arrs.push(new Sprite({
            x: 0,
            y: 100,
            color: 'green',
            width: 300,
            height: 20,
            anchor: { x: 0, y: 0 }
        }));

        yess.push(new Sprite({
            x: 70,
            y: 50,
            color: 'yellow',
            width: 10,
            height: 10,
            anchor: { x: 0, y: 0 }
        }));
        yess.push(new Sprite({
            x: 150,
            y: 50,
            color: 'yellow',
            width: 10,
            height: 10,
            anchor: { x: 0, y: 0 }
        }));
        yess.push(new Sprite({
            x: 210,
            y: 50,
            color: 'yellow',
            width: 10,
            height: 10,
            anchor: { x: 0, y: 0 }
        }));

        bads.push(new Sprite({
            x: 100,
            y: 80,
            color: 'red',
            width: 20,
            height: 20,
            anchor: { x: 0, y: 0 }
        }));

        victor.push(
            new Sprite({
                x: 280,
                y: 0,
                color: 'pink',
                width: 10,
                height: 100,
                anchor: { x: 0, y: 0 }
            })  
        );

        this.gameloop = GameLoop({
            update: () => {
                sprite.update();
                if (sprite.x > canvas.width) {
                    sprite.x = -sprite.width;
                }

            },
            render: () => {
                context.fillStyle = 'black'
                context.font = '16px Courier New'
                context.textBaseline = 'top'
                
                
                for (let i of arrs) {
                    i.render();
                }
                for (let i of bads) {
                    i.render();
                }
                for (let i of yess) {
                    i.render();
                }
                for(let i of victor){
                    i.render();
                }
                context.fillText(`lives: ${sprite.life}  score: ${sprite.score}`, 0, 0);

                if(sprite.finish ){
                    context.fillText(sprite.victory ? "victory":"defeated" , 50, 30);
                }
                else{
                    sprite.render();
                }
            }
        });
    }
}
let myclass = new MyClass();
myclass.gameloop.start();
