

class Block{
    /**
     *Creates an instance of Block.
     * @param {number} x - x座標
     * @param {number} y
     * @param {number} bwidth
     * @param {number} bheight
     * @param {string} label
     * @memberof Block
     */
    constructor(x,y,bwidth,bheight,label){
        this.x = x;
        this.y = y;
        this.setLabelPosition(x,y);
        this.bwidth = bwidth;
        this.bheight = bheight;
        this.label = label;
        this.str = "0000";
    }
    /**
     *
     *
     * @param {string} label
     * @memberof Block
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof Block
     */
    setText(str){
        this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof Block
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y+4;
    }

    draw(){
        rectMode(CORNER);
        rect(this.x, this.y,this.bwidth, this.bheight);
        textSize(9.6);
        strokeWeight(0);
        fill(0);
        textAlign(LEFT,CENTER);
        text(this.label,this.labelX,this.labelY-textSize());
        textAlign(CENTER,CENTER);
        text(this.str,this.x,this.y,this.bwidth,this.bheight);
        strokeWeight(1);
        fill(255);
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
        this.labelX = x-18;
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
    /**
     *Creates an instance of controlerBlock.
     * @param {number} x
     * @param {number} y
     * @param {string} label
     * @memberof controlerBlock
     */
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
    [[0,39],[70,39]],
    //2
    [[106,39],[168,39]],
    //3
    [[168,39],[180,39]],
    //4
    [[168,39],[168,69],[180,69]],
    //5
    [[200,30],[200,10],[50,10],[50,69]],
    //6
    [[50,69],[70,69]],
    //7
    [[50,69],[50,119]],
    //8
    [[90,48],[90,58]],
    //9
    [[90,78],[90,128]],
    //10
    [[67,138],[67,158]],
    //11
    [[67,158],[67,170]],
    //12
    [[0,128],[38,128]],
    //13
    [[50,138],[50,270],[90,270]],
    //14
    [[90,220],[90,270]],
    //15
    [[90,270],[168,270]],
    //16
    [[120,180],[130,180]],
    //17
    [[107,69],[112,69],[112,100],[120,100]],
    //18
    [[90,128],[90,158],[67,158]],
    //19
    [[75,128],[90,128]],
    //20
    [[90,128],[110,128]],
    //21
    [[110,128],[110,170]],
    //22
    [[110,128],[168,128]],
    //GR Line
    //23
    [[168,270],[168,250]],
    //24
    [[168,250],[168,232]],
    //25
    [[168,232],[168,214]],
    //26
    [[168,214],[168,196]],
    //27
    [[168,196],[168,178]],
    //28
    [[168,178],[168,160]],
    //29
    [[168,160],[168,142]],
    //30
    [[168,142],[168,124]],
    //31
    [[168,250],[180,250]],
    //32
    [[168,232],[180,232]],
    //33
    [[168,214],[180,214]],
    //34
    [[168,196],[180,196]],
    //35
    [[168,178],[180,178]],
    //36
    [[168,160],[180,160]],
    //37
    [[168,142],[180,142]],
    //38
    [[168,124],[180,124]],
    //39
    [[168,270],[255,270]],
    //40
    [[255,270],[255,250]],
    //41
    [[255,250],[255,232]],
    //42
    [[255,232],[255,214]],
    //43
    [[255,214],[255,196]],
    //44
    [[255,196],[255,178]],
    //45
    [[255,178],[255,160]],
    //46
    [[255,160],[255,142]],
    //47
    [[255,142],[255,124]],
    //48
    [[255,250],[243,250]],
    //49
    [[255,232],[243,232]],
    //50
    [[255,214],[243,214]],
    //51
    [[255,196],[243,196]],
    //52
    [[255,178],[243,178]],
    //53
    [[255,160],[243,160]],
    //54
    [[255,142],[243,142]],
    //55
    [[255,124],[243,124]],
    //56
    [[168,124],[168,110]],
    //57
    [[168,110],[145,110]],
    //58
    [[168,110],[168,90]],
    //59
    [[168,90],[145,90]],
    //60
    [[168,90],[263,90],[263,150],[377,150],[377,109],[355,109]],
    //61
    [[255,270],[382,270],[382,19],[342,19]],
    //62
    [[342,19],[342,29]],
    //63
    [[342,19],[306,19],[306,29]],
    //64
    [[342,48],[342,80]],
    //65
    [[306,48],[306,80]],
];


class Cometp5Line{
    /**
     *Creates an instance of Cometp5Line.
     * @param {number} id - Line id
     * @memberof Cometp5Line
     */
    constructor(id){
        this.id = id;
        this.color = color(0,0,0);
    }
    /**
     *
     * Line draw
     * @memberof Cometp5Line
     */
    draw(){
        stroke(this.color);
        noFill();
        beginShape();
        LinePatern[this.id].forEach(element => {
            vertex(element[0],element[1]);
        });
        endShape();
        stroke(color(0,0,0));
    }
    setColor(col){
        this.color = col;
    }
    active(){
        this.color = color(255,0,0);
    }
    inactive(){
        this.color = color(0,0,0);
    }
}

let MAR,MARunder,MDR,PR,SP,FR,Opcode,r1,r2,adr,Decoder,Controler;
var GR = [],GRLabel = [],IRLabel = [];
let COMETLine = [];

//$(document).ready(function () {}
// setup comet2の初期描画
function setup(){
    //alert(document.getElementById('canvas').clientHeight);
    //alert(document.getElementById('canvas').clientWidth);

    let canvas = createCanvas($("#comet_area").width(),$("#comet_area").height()*2);
    canvas.parent('canvas');
    MAR = new Block(70,30,36,18,"MAR");
    MARunder = new Block(70,60,36,18,"");
    MDR = new MDRBlock(38,120,36,18,"MDR");
    PR = new Block(180,30,36,18,"PR");
    SP = new Block(180,60,36,18,"SP");
    FR = new frBlock(130,170,"FR");
    Opcode = new opcodeBlock(280,100,"");
    r1 = new registerBlock(298,100,"");
    r2 = new registerBlock(307,100,"");
    adr = new addressBlock(320,100,"");
    Decoder = new decoderBlock(270,80,"Decoder");
    Controler = new controlerBlock(270,160,"Controler");
    for(var i = 0;i < 8;i++){
        GR.push(new Block(180,114+18*i,36,18,""));
        GRLabel.push(new Block(216,114+18*i,27,18,""));
        GRLabel[i].setText("GR"+i);
        GR[i].setText(toHex(registerHexGet(i)));
    }
    IRLabel.push(new Block(326-36,30,36,18,"IR"));
    IRLabel.push(new Block(326,30,36,18,""));
    for(var i=0;i<LinePatern.length;i++)
    COMETLine.push(new Cometp5Line(i));
    noLoop();
}

var inc = 0;
function draw(){
    background(255);
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

    text(str(frameCount),10,10);
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
    vertex(120, 90);
    vertex(120, 110);
    vertex(130, 115);
    vertex(145, 115);
    vertex(145, 105);
    vertex(130, 100);
    vertex(145, 95);
    vertex(145, 85);
    vertex(130, 85);
    vertex(120, 90);
    endShape();
    //ALU
    beginShape();
    vertex(60,170);
    vertex(80,170);
    vertex(90,200);
    vertex(100,170);
    vertex(120,170);
    vertex(120,200);
    vertex(100,220);
    vertex(80,220);
    vertex(60,200);
    vertex(60,170);
    endShape();
    COMETLine.forEach(element => {
        //stroke(255, 255, 0);
        element.draw();
        //stroke(0, 0, 0);
    });
    fill(255);
    //noStroke();
}

function registerCometSync(address){
    if(address >= 0 && address <= 7){
        let registerval = registerHexGet(address);//.replace('#','');
        GR[address].setText(toHex(registerval));
    }
}
function prCometSync(value){
    PR.setText(toHex(value));
}
function mousePressed(){
}

