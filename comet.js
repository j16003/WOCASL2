
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
    setLabel(label){
        this.label = label;
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
        textSize(9.6);
        textAlign(LEFT,CENTER);
        text(this.label,this.labelX,this.labelY-textSize());
        textAlign(CENTER,CENTER);
        text(this.str,this.x+this.bwidth/2,this.y+textSize());
    }
}

let MAR,MARunder,MDR,PR,SP;
let GR = [],GRLabel = [],IRLabel = [];
//$(document).ready(function () {}
// setup comet2の初期描画
function setup(){
    //alert(document.getElementById('canvas').clientHeight);
    //alert(document.getElementById('canvas').clientWidth);

    let canvas = createCanvas($("#canvas").width()*2,$("#canvas").height()*2);
    canvas.parent('canvas');
    MAR = new Block(30,30,36,18,"MAR");
    MARunder = new Block(30,60,36,18,"");
    MDR = new Block(18,120,36,18,"MDR");
    PR = new Block(120,30,36,18,"PR");
    SP = new Block(120,70,36,18,"SP");
    for(var i = 0;i < 8;i++){
        GR.push(new Block(120,114+18*i,36,18,""));
        GRLabel.push(new Block(156,114+18*i,27,18,""));
        GRLabel[i].setText("GR"+i);
    }
    IRLabel.push(new Block(276-36,50,36,18,"IR"));
    IRLabel.push(new Block(276,50,36,18,""));
    
        
}

var inc = 0;
function draw(){
    //MAR.setText();
    MAR.draw();
    MARunder.draw();
    MDR.draw();
    PR.draw();
    SP.draw();
    for(var i = 0;i < 8;i++){
        GR[i].draw();
        GRLabel[i].draw();
    }
    for(var i = 0;i < 2;i++){
        IRLabel[i].draw();
    }
}

