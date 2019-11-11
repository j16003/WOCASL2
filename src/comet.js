
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

class frBlock extends Block{
    constructor(x,y,label){
        super(x,y,36-9,18,label);
        this.str = "000";
        
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
}

class MDRBlock extends Block{
    constructor(x,y,bwidth,bheight,label){
        super(x,y,bwidth,bheight,label);
        this.str = "FFFF";
    }
    setLabel(label){
        this.label = label;
    }
    setText(str){
        this.str = str;
    }
    setLabelPosition(x,y){
        this.labelX = x+18;
        this.labelY = y;
    }
}

class opcodeBlock extends Block{
    constructor(x,y,label){
        super(x,y,36-18,18,label);
        this.str = "00";
        
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
}

class registerBlock extends Block{
    constructor(x,y,label){
        super(x,y,9,18,label);
        this.str = "0";
        
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
}

class addressBlock extends Block{
    constructor(x,y,label){
        super(x,y,36,18,label);
        this.str = "0000";
        
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
}

class decoderBlock extends Block{
    constructor(x,y,label){
        super(x,y,100,60,label);
        this.str = "";
        this.setLabelPosition(x+9,y+18);
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
}

class controlerBlock extends Block{
    constructor(x,y,label){
        super(x,y,100,50,label);
        this.str = "";
        this.setLabelPosition(x+9,y+18);
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
}

const LinePatern = [
    //id 1
    [[0,39],[30,39]],
    //2
    [[66,39],[160,39]],
    //3
    [[160,39],[180,39]],
    //4
    [[160,39],[160,79],[180,79]],
    //5
    [[200,30],[200,10],[15,10],[15,69]],
    //6
    [[15,69],[30,69]],
    //7
    [[15,69],[15,109]],

];


class DefaultLine{
    constructor(id){
        this.id = id;
    }
    draw(){
        noFill();
        beginShape();
        LinePatern[this.id].forEach(element => {
            vertex(element[0],element[1]);
        });
        endShape();
    }
}

let MAR,MARunder,MDR,PR,SP,FR,Opcode,r1,r2,adr,Decoder,Controler;
let GR = [],GRLabel = [],IRLabel = [];
let COMETLine = [];
//$(document).ready(function () {}
// setup comet2の初期描画
function setup(){
    //alert(document.getElementById('canvas').clientHeight);
    //alert(document.getElementById('canvas').clientWidth);

    let canvas = createCanvas($("#comet_area").width(),$("#comet_area").height()*2);
    canvas.parent('canvas');
    MAR = new Block(30,30,36,18,"MAR");
    MARunder = new Block(30,60,36,18,"");
    MDR = new MDRBlock(38,120,36,18,"MDR");
    PR = new Block(180,30,36,18,"PR");
    SP = new Block(180,70,36,18,"SP");
    FR = new frBlock(100,170,"FR");
    Opcode = new opcodeBlock(280,120,"");
    r1 = new registerBlock(298,120,"");
    r2 = new registerBlock(307,120,"");
    adr = new addressBlock(320,120,"");
    Decoder = new decoderBlock(270,100,"Decoder");
    Controler = new controlerBlock(270,180,"Controler");
    for(var i = 0;i < 8;i++){
        GR.push(new Block(180,114+18*i,36,18,""));
        GRLabel.push(new Block(216,114+18*i,27,18,""));
        GRLabel[i].setText("GR"+i);
    }
    IRLabel.push(new Block(326-36,50,36,18,"IR"));
    IRLabel.push(new Block(326,50,36,18,""));
    for(var i=0;i<LinePatern.length;i++)
    COMETLine.push(new DefaultLine(i));



}

var inc = 0;
function draw(){
    //MAR.setText();
    /*for(let l = 0;l<=200;l++){
        if(l%5==0){
            stroke(color(255,204,0));
        }else{
            stroke(color(0,0,0));
        }
        line(0,l*10,1000,l*10);
        line(l*10,0,l*10,1000);
    }
    stroke(color(0,0,0));*/

    MAR.draw();
    MARunder.draw();
    MDR.draw();
    PR.draw();
    SP.draw();
    FR.draw();
    Controler.draw();
    Decoder.draw();
    r1.draw();
    r2.draw();
    Opcode.draw();
    adr.draw();
    for(var i = 0;i < 8;i++){
        GR[i].draw();
        GRLabel[i].draw();
    }
    for(var i = 0;i < 2;i++){
        IRLabel[i].draw();
    }
    //Adder
    beginShape();
    vertex(80, 60);
    vertex(80, 80);
    vertex(90, 85);
    vertex(105, 85);
    vertex(105, 75);
    vertex(90, 70);
    vertex(105, 65);
    vertex(105, 55);
    vertex(90, 55);
    vertex(80, 60);
    endShape();
    //ALU
    beginShape();
    vertex(30,170);
    vertex(50,170);
    vertex(60,200);
    vertex(70,170);
    vertex(90,170);
    vertex(90,200);
    vertex(70,220);
    vertex(50,220);
    vertex(30,200);
    vertex(30,170);
    endShape();
    COMETLine.forEach(element => {
        element.draw();
    });
}

