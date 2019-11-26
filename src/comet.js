

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
        this.color = color(0,0,0);
        this.udecNumber = 0;
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
    getText(){
        return this.str;
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
    setUdecNumber(n){
        this.udecNumber=n;
    }
    getUdecNumber(){
        return this.udecNumber;
    }
    draw(){
        rectMode(CORNER);
        stroke(this.color);
        rect(this.x, this.y,this.bwidth, this.bheight);
        stroke(0);
        //textSize(9.6);
        strokeWeight(0);
        fill(0);
        textAlign(LEFT,CENTER);
        text(this.label,this.labelX,this.labelY-textSize());
        textAlign(CENTER,CENTER);
        text(this.str,this.x+2,this.y,this.bwidth,this.bheight);
        strokeWeight(1);
        fill(255);
    }
    active(){
        this.color = color(255,0,0);
    }
    inactive(){
        this.color = color(0,0,0);
    }
}

/**
 *
 *
 * @class frBlock
 * @extends {Block}
 */
class frBlock extends Block{
    constructor(x,y,label){
        super(x,y,36-9,18,label);
        this.str = "000";
        
    }
    /**
     *
     *
     * @param {string} label
     * @memberof frBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof frBlock
     */
    setText(str){
        this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof frBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}

/**
 *
 *
 * @class MDRBlock
 * @extends {Block}
 */
class MDRBlock extends Block{
    constructor(x,y,bwidth,bheight,label){
        super(x,y,bwidth,bheight,label);
        this.str = "FFFF";
    }
    /**
     *
     *
     * @param {string} label
     * @memberof MDRBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof MDRBlock
     */
    setText(str){
        this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof MDRBlock
     */
    setLabelPosition(x,y){
        this.labelX = x-18;
        this.labelY = y;
    }
}

/**
 *
 *
 * @class opcodeBlock
 * @extends {Block}
 */
class opcodeBlock extends Block{
    constructor(x,y,label){
        super(x,y,36-18,18,label);
        this.str = "00";
        
    }
    /**
     *
     *
     * @param {string} label
     * @memberof opcodeBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof opcodeBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof opcodeBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}

/**
 *
 *
 * @class registerBlock
 * @extends {Block}
 */
class registerBlock extends Block{
    constructor(x,y,label){
        super(x,y,12,18,label);
        this.str = "0";
    }
    /**
     *
     *
     * @param {string} label
     * @memberof registerBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof registerBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof registerBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}

/**
 *
 *
 * @class addressBlock
 * @extends {Block}
 */
class addressBlock extends Block{
    constructor(x,y,label){
        super(x,y,36,18,label);
        this.str = "0000";
        
    }
    /**
     *
     *
     * @param {string} label
     * @memberof addressBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof addressBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof addressBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}

/**
 *
 *
 * @class decoderBlock
 * @extends {Block}
 */
class decoderBlock extends Block{
    constructor(x,y,label){
        super(x,y,100,60,label);
        this.str = "";
        this.setLabelPosition(x+9,y+18);
    }
    /**
     *
     *
     * @param {string} label
     * @memberof decoderBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof decoderBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof decoderBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}

class CometEmulator{
    constructor(){
        this.counter = 0;
        this.address = 0;
        //mode 1: 命令取りだしサイクル,2: 命令取り出しサイクル2語,3: 命令解読サイクル,4:アドレス生成,5: 実行命令
        this.mode = 1;
    }
    reset(){
        this.counter = 0;
        this.mode = 1;
    }
    execute(){
        console.log(this.mode,this.counter);
        this.clearAllLine();
        this.clearAllBlock();
        this.activeAllLine(this.counter);
        switch(this.mode){
            case 1:
                switch (this.counter){
                    case 0:
                        MAR.active();
                        MAR.setText(PR.str);
                        PR.active();
                    break;
                    case 1:
                       MAR.active();
                    break;
                    case 2:
                        PR.active();
                        MDR.active();
                        MAR.active();
                        this.address = prUdecGet();
                        MDR.setUdecNumber(memoryUdecGet(this.address));
                        MDR.setText(toHex(MDR.getUdecNumber()));

                        prValueSet(prUdecGet()+1);

                        PR.setUdecNumber(prUdecGet());
                        PR.setText(toHex(PR.getUdecNumber()));

                    break;
                    case 3:
                        MDR.active();
                        IRLabel[0].active();
                        IRLabel[0].setUdecNumber(MDR.getUdecNumber());
                        IRLabel[0].setText(MDR.getText());
                        if( memoryLengthGet(this.address) == 1){
                            this.mode = 3;
                            this.counter = 7;
                        }else{
                            this.mode = 2;
                        }   
                    break;
                    default:
                        return 0;
                    break;
                }
                break;
            case 2:
                switch(this.counter){
                    case 4:
                        PR.active();
                        MAR.active();
                        MAR.setUdecNumber(PR.getUdecNumber());
                        MAR.setText(PR.getText());
                    break;
                    case 5:
                        MAR.active();
                    break;
                    case 6:
                        PR.active();
                        MAR.active();
                        MDR.setUdecNumber(memoryUdecGet(prUdecGet()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        prValueSet(prUdecGet()+1);
                        PR.setText(toHex((prUdecGet())));
                        MDR.active();
                    break;
                    case 7:
                        IRLabel[1].active();
                        IRLabel[1].setUdecNumber(MDR.getUdecNumber());
                        IRLabel[1].setText(MDR.getText());
                        this.mode = 3;
                    break;
                    default:
                        return 0;
                    break;
                }
            break;
            case 3:
                switch(this.counter){
                    case 8:
                        MDR.inactive();
                        IRLabel[0].active();
                        IRLabel[1].active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        r2.active();
                        adr.active();
                        
                        Opcode.setText(IRLabel[0].getText()[1]+IRLabel[0].getText()[2]);
                        Opcode.udecNumber = parseInt(Opcode.getText(),16);

                        r1.setText(IRLabel[0].getText()[3]);
                        r1.setUdecNumber(parseInt(IRLabel[0].getText()[3]));
                        r2.setText(IRLabel[0].getText()[4]);
                        r2.setUdecNumber(parseInt(IRLabel[0].getText()[4]));
                        adr.setUdecNumber(IRLabel[1].getUdecNumber());
                        adr.setText(IRLabel[1].getText());
                       
                    break;
                    case 9:
                        Controler.setText(memoryLiteralGet(this.address))
                        Controler.active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        r2.active();
                        if(memoryLengthGet(this.address)==1){
                            this.opcodeToMode(Opcode.getUdecNumber());
                        }else{
                            if(r2.getUdecNumber() > 0){
                                GR[r2.getUdecNumber()].active();
                                GRLabel[r2.getUdecNumber()].active();
                            }
                            this.mode = 4;
                        }   
                    break;
                    default:
                        return 0;
                    break;
                }
            break;
            case 4:
                switch(this.counter){
                    case 10:
                        adr.active();
                        r2.active();
                        Controler.active();
                    break;
                    case 11:
                        Adder.active();
                        adr.active();
                        MARunder.active();
                        Controler.active();
                        r2.active()
                        MARunder.setUdecNumber(adr.getUdecNumber());
                        MARunder.setText(adr.getText());
                        this.opcodeToMode(Opcode.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //LD GR , Addr
            case 5:
                switch(this.counter){
                    case 12:
                        MARunder.active();
                        MAR.active();
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        MAR.setText(MARunder.getText());
                        Controler.active();
                    break;
                    case 13:
                        Controler.active();
                        MAR.active();
                    break;
                    case 14:
                        MAR.active();
                        MDR.active();
                        Controler.active();
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                    break;
                    case 15:
                        FR.active();
                        ALU.active();
                        Controler.active();
                        Decoder.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        
                        registerAllSet(r1.getUdecNumber(),MDR.getUdecNumber());
                        this.registerALUActiveLine(r1.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //LD GR,GR
            case 6:
                switch(this.counter){
                    case 16:
                        r1.active();
                        COMETLine[38-r2.getUdecNumber()].active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        ALU.active();
                        FR.active();
                        signFlagSet(registerUdecGet(r1.getUdecNumber()));
                        zeroFlagSet(registerUdecGet(r1.getUdecNumber()));
                    break;
                    case 17:
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        FR.active();
                        this.registerControlActiveLine(r2.getUdecNumber());
                        registerAllSet(r2.getUdecNumber(),registerUdecGet(r1.getUdecNumber()));
                    break;
                    default:
                        return 0;
                    break;
                }
            break;
            //ST GR1,Addr
            case 7:
                switch(this.counter){
                    case 18:
                        MAR.active();
                        MARunder.active();
                        MDR.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                    break;
                    case 19:
                        MAR.active();
                        MDR.active();
                        r1.active();
                        Controler.active();
                    break;
                    //TODO memoryに値格納
                    case 20:
                        memoryAllSet(registerUdecGet(r1.getUdecNumber()),adr.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            }
        redraw();
        this.counter++;
        return 1;
    }
    nextLineActive(){
        if(this.counter > 0){
            for(var i=0;i<InstructionfetchCycle[this.counter-1].length;i++){
                COMETLine[InstructionfetchCycle[this.counter-1][i]].inactive();
            }
        }
        for(var i=0;i<InstructionfetchCycle[this.counter].length;i++){
            COMETLine[InstructionfetchCycle[this.counter][i]].active();
        }
        if(this.counter <= InstructionfetchCycle.length-1){
            this.counter++;
        }
    }
    registerALUActiveLine(gr){
        let n = 30 - gr;
        for(var i = 22;i < n;i++){
            COMETLine[i].active();
        };
        COMETLine[37-gr].active();
    }
    registerControlActiveLine(gr){
        let n = 47 - gr;
        for(var i=39;i < n;i++){
            COMETLine[i].active();
        }
        COMETLine[54-gr].active();
    }
    prevClearLine(line){
        for(var i = 0;i < InstructionfetchCycle[line].length;i++){
            COMETLine[InstructionfetchCycle[line][i]].inactive();
        }
    }
    activeAllLine(index){
        for(var i =0;i < InstructionfetchCycle[index].length;i++){
            COMETLine[InstructionfetchCycle[index][i]].active();
        }
    }
    clearAllLine(){
        for(var i = 0;i < COMETLine.length;i++){
            COMETLine[i].inactive();
        }
    }
    clearAllBlock(){
        ALU.inactive();
        MAR.inactive();
        MARunder.inactive();
        MDR.inactive();
        PR.inactive();
        SP.inactive();
        FR.inactive();
        Opcode.inactive();
        r1.inactive();
        r2.inactive();
        adr.inactive();
        Decoder.inactive();
        Controler.inactive();
        Adder.inactive();
        ALU.inactive();
        for(var i = 0;i < GR.length;i++){
            GR[i].inactive();
            GRLabel[i].inactive();
        }
        IRLabel[0].inactive();
        IRLabel[1].inactive();
    }
    opcodeToMode(op){
        switch (op){
            case 0x10:
                this.mode = 5;
            break;
            case 0x11:
                this.mode = 7;
                this.counter = 17;
            break;
            case 0x14:
                this.mode = 6;
                this.counter = 15;
            break;
            default:
                alert(op);
            break;
        }  
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
    /**
     *
     *
     * @param {string} label
     * @memberof controlerBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof controlerBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof controlerBlock
     */
    setLabelPosition(x,y){
        this.labelX = x;
        this.labelY = y;
    }
}
class AdderBlock extends Block{
    constructor(){
        super(0,0,0,0,"");
    }
    draw(){
        stroke(this.color);
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
        stroke(0);
    }
}
class ALUBlock extends Block{
    constructor(){
        super(0,0,0,0,"");
    }
    draw(){
        stroke(this.color);
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
var InstructionfetchCycle = [
    [1,2],              //0
    [0],                //1
    [0,11],             //2
    [62,60,12,14,38],   //3
    [1,2],              //4
    [0],                //5
    [0,12],             //6 
    [61,60,12,14,38],   //7
    [63,64],            //8
    [],                 //9
    [58,59],            //10
    [16,58,59],         //11
    [7],                //12
    [0],                //13
    [0,11],             //14
    [9,10,13,14,15],    //15
    [15,20,21],         //16
    [13,14,15,38],      //17
    [18,19,21],         //18
    [0],
    [],
];

/**
 *
 *
 * @class Cometp5Line
 */
class Cometp5Line{
    /** @member {number} */
    id = 0;
    /** @member {booleam} disable*/
    disable = true;
    /**
     *Creates an instance of Cometp5Line.
     * @param {number} id - Line id
     * @memberof Cometp5Line
     */
    constructor(id){
        /** @member {number} id*/
        this.id = id;
        /** @member {color} color*/
        this.color = color(0,0,0);
        /** @member {booleam} disable*/
        this.disable = true;
    }
    /**
     *
     * Line draw
     * @memberof Cometp5Line
     */
    draw(){
        if(this.disable){
            stroke(this.color);
            noFill();
            beginShape();
            LinePatern[this.id].forEach(element => {
                vertex(element[0],element[1]);
            });
            endShape();
            stroke(color(0,0,0));
        }
    }
    /**
     *
     *
     * @param {string} col
     * @memberof Cometp5Line
     */
    setColor(col){
        this.color = col;
    }
    /**
     * Lineをアクティブ(赤色)にする
     * 
     * @memberof Cometp5Line
     */
    active(){
        this.color = color(255,0,0);
    }
    /**
     * Lineを非アクティブ(黒色)にする
     *
     * @memberof Cometp5Line
     */
    inactive(){
        this.color = color(0,0,0);
    }
    enable(flag){
        this.enable = flag;
    }
}

let MAR,MARunder,MDR,PR,SP,FR,Opcode,r1,r2,adr,Decoder,Controler,Adder,ALU;
var GR = [],GRLabel = [],IRLabel = [];
let COMETLine = [];

// setup comet2の初期描画
function setup(){
    let canvas = createCanvas($("#comet_area").width(),$("#comet_area").height());
    canvas.parent('canvas');
    MAR = new Block(70,30,36,18,"MAR");
    MARunder = new Block(70,60,36,18,"");
    MDR = new MDRBlock(38,120,36,18,"MDR");
    PR = new Block(180,30,36,18,"PR");
    SP = new Block(180,60,36,18,"SP");
    FR = new frBlock(130,170,"FR");
    Opcode = new opcodeBlock(280,100,"");
    r1 = new registerBlock(298,100,"");
    r2 = new registerBlock(310,100,"");
    adr = new addressBlock(325,100,"");
    Decoder = new decoderBlock(270,80,"Decoder");
    Controler = new controlerBlock(270,160,"Controler");
    Adder = new AdderBlock();
    ALU = new ALUBlock();
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
/**
 *
 *
 */
function draw(){
    background(255);
  

    text(str(COMETEmu.counter),10,10);
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
    Adder.draw();
    //ALU
    ALU.draw();
    COMETLine.forEach(element => {
        element.draw();
    });
    fill(255);
}

/**
 * registerの値をComet内に反映させる
 *
 * @param {number} address
 */
function registerCometSync(address){
    if(address >= 0 && address <= 7){
        let registerval = registerHexGet(address);//.replace('#','');
        GR[address].setText(toHex(registerval));
        GR[address].setUdecNumber(registerval);
    }
}
function flagRegisterCometSync(){
    let f = overflowFlagGet().toString() + signFlagGet().toString() + zeroFlagGet().toString();
    FR.setText(f);
}
function prCometSync(value){
    PR.setText(toHex(value));
}
let counter = 0;
function mousePressed(){
}


