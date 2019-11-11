
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
const LinePatern = new Array(
    //id 1
    new Array(new Pair(90,90),new Pair(90,90)),
    //id E2 
    new Array(),
);


class defaultLine{
    constructor(id){
        this.id = id;
    }
    draw(){
        beginShape();
        LinePatern[this.id].forEach(element => {
            vertex(element.first,element.second);
        });
        endShape();
    }
}

let MAR,MARunder,MDR,PR,SP,FR,Opcode,r1,r2,adr,Decoder,Controler;
let GR = [],GRLabel = [],IRLabel = [];
//$(document).ready(function () {}
// setup comet2の初期描画
function setup(){
    //alert(document.getElementById('canvas').clientHeight);
    //alert(document.getElementById('canvas').clientWidth);

    let canvas = createCanvas($("#comet_area").width(),$("#comet_area").height()*2);
    canvas.parent('canvas');
    MAR = new Block(30,30,36,18,"MAR");
    MARunder = new Block(30,60,36,18,"");
    MDR = new Block(18,120,36,18,"MDR");
    PR = new Block(150,30,36,18,"PR");
    SP = new Block(150,70,36,18,"SP");
    FR = new frBlock(80,170,"FR");
    Opcode = new opcodeBlock(240,120,"");
    r1 = new registerBlock(258,120,"");
    r2 = new registerBlock(267,120,"");
    adr = new addressBlock(280,120,"");
    Decoder = new decoderBlock(230,100,"Decoder");
    Controler = new controlerBlock(230,180,"Controler");
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
    vertex(10,170);
    vertex(30,170);
    vertex(40,200);
    vertex(50,170);
    vertex(70,170);
    vertex(70,200);
    vertex(50,220);
    vertex(30,220);
    vertex(10,200);
    vertex(10,170);
    endShape();
}

