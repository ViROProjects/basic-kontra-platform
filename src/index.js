import { init, Sprite, GameLoop, initKeys, keyPressed } from 'kontra';

let { canvas, context } = init();

let arrs,bads,yess,victor;

initKeys();

class TextScene {
    constructor(e){
        this.finish=true;
    }
    update(){

    }
    render(){
        context.fillText("Generic Title Screen", 20, 30);
        context.fillText("A game for you", 30, 45);
        context.fillText("By ViRO", 20, 60);
        context.fillText("<Press ENTER>", 40, 80);

        context.fillText("Collect yellow, avoid Red, finish on Purple bar", 10, 100);
        context.fillText("finish on Purple bar", 10, 125);
    }
}

class Scene {
    constructor(e) {
        arrs=[],bads=[],yess=[],victor = [];
        this.finish=false;
        this.sprite = new Player(e.sprite);
        for(let i of e.bads){
            bads.push(new Sprite(i));
        }
        for(let i of e.yess){
            yess.push(new Sprite(i));
        }
        for(let i of e.victor){
            victor.push(new Sprite(i));
        }
        for(let i of e.arrs){
            arrs.push(new Sprite(i));
        }
    }
    update() {
        this.sprite.update();
        if (this.sprite.x > canvas.width) {
            this.sprite.x = -this.sprite.width;
        }
        if(this.sprite.finish){
            //this.victor[0].color ="BlueViolet";
            this.finish=true;
        }
        if(this.sprite.mission){
            victor[0].color ="BlueViolet";
            //this.finish=true;
        }
    }
    render() {
        for (let i of arrs) {
            i.render();
        }
        for (let i of bads) {
            i.render();
        }
        for (let i of yess) {
            i.render();
        }
        for (let i of victor) {
            i.render();
        }
        context.fillText(`lives: ${this.sprite.life}  score: ${this.sprite.score}`, 0, 0);

        if (this.sprite.finish) {
            context.fillText(this.sprite.victory ? "victory <press enter>" : "defeated <press enter>", 50, 30);
        }
        else {
            this.sprite.render();
        }
    }
}

class Player extends Sprite.class {
    constructor(a) {
        super(a)
        this.onGround = false;
        this.life = 3;
        this.score = 0;
        this.initial = this.position;
        this.mission = false;
        this.finish = false;
        this.victory = false;
    }
    update() {
        if (!this.finish) {
            this.dx = 0;
            this.dy = this.dy < 6 ? this.dy + 1 : 6;
            if (victor.filter(x => this.collidesWith(x)).length && this.mission) {
                this.finish = true;
                this.victory = true;
            }

            if (bads.filter(x => this.collidesWith(x)).length) {
                if (this.life > 0) {
                    this.position = this.initial;
                    this.life -= 1;
                }
                else {
                    this.finish = true;
                }
            }

            if (yess.filter(x => this.collidesWith(x)).length) {
                this.score += yess.filter(x => this.collidesWith(x)).length;
                yess = yess.filter(x => !this.collidesWith(x));
            }
            if(this.score >= 3){
                this.mission=true;
            }

            if (keyPressed('left')) {
                this.dx = -2.6;
            }
            else if (keyPressed('right')) {
                this.dx = 2.6;
            }

            if (keyPressed('up') && this.onGround) {
                this.dy = -12;
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
    
    newScene(){
        return new Scene({
            sprite: {
                x: 0,
                y: 80,
                color: 'blue',
                width: 20,
                height: 20,
                anchor: { x: 0, y: 0 }
            },
            arrs: [{
                x: 0,
                y: 100,
                color: 'green',
                width: 300,
                height: 20,
                anchor: { x: 0, y: 0 }
            }
            ],
            bads: [{
                x: 100,
                y: 80,
                color: 'red',
                width: 20,
                height: 20,
                anchor: { x: 0, y: 0 }
            }],
            yess: [{
                x: 70,
                y: 50,
                color: 'yellow',
                width: 10,
                height: 10,
                anchor: { x: 0, y: 0 }
            }, {
                x: 150,
                y: 50,
                color: 'yellow',
                width: 10,
                height: 10,
                anchor: { x: 0, y: 0 }
            }, {
                x: 210,
                y: 50,
                color: 'yellow',
                width: 10,
                height: 10,
                anchor: { x: 0, y: 0 }
            }
            ],
            victor: [{
                x: 280,
                y: 0,
                color: 'black',
                width: 10,
                height: 100,
                anchor: { x: 0, y: 0 }
            }]
        });
    }
    constructor() {
        this.scene =  new TextScene(); //this.newScene();

        this.gameloop = GameLoop({
            update: () => {
                if(this.scene.finish && keyPressed('enter')){
                    this.scene=this.newScene();
                }
                else{
                    this.scene.update();
                }
            },
            render: () => {
                context.fillStyle = 'black'
                context.font = '16px Courier New'
                context.textBaseline = 'top'
                this.scene.render();
            }
        });
    }

}
let myclass = new MyClass();
myclass.gameloop.start();
