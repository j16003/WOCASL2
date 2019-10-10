
class Block{
    constructor(x,y,bwidth,bheight,label){
        this.x = x;
        this.y = y;
        this.setLabelPosition(x,y);
        this.bwidth = bwidth;
        this.bheight = bheight;
        this.label = label;
        this.str = "FFFF";
    }
    setText(str){
        this.str = str;
    }
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
    draw(){
        rectMode(CORNER);
        rect(this.x, this.y,this.bwidth, this.bheight);
        textSize(16);
        textAlign(LEFT,CENTER);
        text(this.label,this.labelX,this.labelY-textSize());
        textAlign(CENTER,CENTER);
        text(this.str,this.x+this.bwidth/2,this.y+textSize());
    }
}
var MAR;
//$(document).ready(function () {}
// setup comet2の初期描画
function setup(){
    //alert(document.getElementById('canvas').clientHeight);
    //alert(document.getElementById('canvas').clientWidth);
    let canvas = createCanvas($("#canvas").width(),$("#canvas").height());
    canvas.parent('canvas');
    MAR = new Block(100,100,60,30,"MAR");
}

function draw(){
    MAR.draw();
}

