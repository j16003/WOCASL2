

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
        this.labelY = y+6;
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
        textSize(10.8);
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
        super(x,y,27,18,label);
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
        this.labelY = y+6;
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
        super(x,y,20,18,label);
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
        super(x,y,14,18,label);
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
        super(x,y,45,18,label);
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
        super(x,y,108,60,label);
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
     * 文字をセットする
     * @param {string} str
     * @memberof decoderBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     * Labelのポジションをセットする
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

    /**
     *Creates an instance of CometEmulator.
     * @memberof CometEmulator
     */
    constructor(){
        this.counter = 0;
        this.address = 0;
        //mode 1: 命令取りだしサイクル,2: 命令取り出しサイクル2語,3: 命令解読サイクル,4:アドレス生成,5: 実行命令
        this.mode = 1;
        this.memoryLineEnable = false;
        this.memoryLineAddress = memoryTableMaxRow-1;
    }
    reset(){
        this.counter = 0;
        this.mode = 1;
    }
    /**
     *
     * COMET2実行
     * @returns {number} 
     * @memberof CometEmulator
     */
    execute(){
        console.log(this.mode,this.counter);
        this.clearAllLine();
        this.clearAllBlock();
        this.activeAllLine(this.counter);
        memoryTableRowColorSet(this.memoryLineAddress,"light");
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
                        if(r2.getUdecNumber() > 0){
                            MARunder.setUdecNumber(MARunder.getUdecNumber()+registerUdecGet(r2.getUdecNumber()));
                        }
                        MARunder.setText(toHex(MARunder.getUdecNumber()));
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
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        MDR.setText(GR[r1.getUdecNumber()].getText());
                        MDR.setUdecNumber(GR[r1.getUdecNumber()].getUdecNumber())
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
                        MAR.active();
                        MDR.active();
                        r1.active();
                        Controler.active();
                        memoryAllSet(MAR.getUdecNumber(),registerUdecGet(r1.getUdecNumber()));
                    break;
                    default:
                        return 0;
                }
            break;
            //LAD GR , Addr
            case 8:
                switch(this.counter){
                    case 21:
                        Controler.active();
                        r1.active();
                        MARunder.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        this.registerALUActiveLine(0);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        registerAllSet(r1.getUdecNumber(),MARunder.getUdecNumber());
                        COMETLine[37].inactive();
                    break;
                    default:
                        return 0;
                }
            break;
            //ADDA GR1,Addr
            case 9:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        Controler.active();
                    break;
                    case 25:
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        registerAllSet(r1.getUdecNumber(),registerUdecGet(r1.getUdecNumber())+MDR.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //ADDA GR , GR
            case 10:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
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
        if(index < InstructionfetchCycle.length){
            for(var i =0;i < InstructionfetchCycle[index].length;i++){
                COMETLine[InstructionfetchCycle[index][i]].active();
            }
        }
    }
    /**
     * COMET2のLineをすべてinactive
     *
     * @memberof CometEmulator
     */
    clearAllLine(){
        for(var i = 0;i < COMETLine.length;i++){
            COMETLine[i].inactive();
        }
        this.memoryLineEnable = false;
    }
    /**
     * すべてのBlockをinactive
     *
     * @memberof CometEmulator
     */
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
            case 0x12:
                this.mode = 8;
                this.counter = 20;
            break;
            case 0x14:
                this.mode = 6;
                this.counter = 15;
            break;
            case 0x20:
                this.mode = 9;
                this.counter = 21;
            break;
            case 0x24:
                this.mode = 10;
                this.counter = 26;
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
        vertex(101, 90);
        vertex(101, 110);
        vertex(111, 115);
        vertex(126, 115);
        vertex(126, 105);
        vertex(111, 100);
        vertex(126, 95);
        vertex(126, 85);
        vertex(111, 85);
        vertex(101, 90);
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
        vertex(41,170);
        vertex(61,170);
        vertex(71,200);
        vertex(81,170);
        vertex(101,170);
        vertex(101,200);
        vertex(81,220);
        vertex(61,220);
        vertex(41,200);
        vertex(41,170);
        endShape();
    }
}

const LinePatern = [
    //id 1
    [[0,39],[51,39]],
    //2
    [[97,39],[149,39]],
    //3
    [[149,39],[161,39]],
    //4
    [[149,39],[149,69],[161,69]],
    //5
    [[182,30],[182,10],[31,10],[31,69]],
    //6
    [[31,69],[51,69]],
    //7
    [[31,69],[31,115]],
    //8
    [[71,48],[71,60]],
    //9
    [[71,78],[71,128]],
    //10
    [[48,134],[48,158]],
    //11
    [[48,158],[48,170]],
    //12
    [[0,124],[19,124]],
    //13
    [[31,134],[31,270],[71,270]],
    //14
    [[71,220],[71,270]],
    //15
    [[71,270],[149,270]],
    //16
    [[101,180],[111,180]],
    //17
    [[90,77],[90,100],[101,100]],
    //18
    [[71,128],[71,158],[48,158]],
    //19
    [[65,124],[71,124]],
    //20
    [[71,124],[91,124]],
    //21
    [[91,124],[91,170]],
    //22
    [[91,124],[149,124]],
    //GR Line
    //23
    [[149,270],[149,257]],
    //24
    [[149,257],[149,238]],
    //25
    [[149,238],[149,219]],
    //26
    [[149,219],[149,200]],
    //27
    [[149,200],[149,181]],
    //28
    [[149,181],[149,162]],
    //29
    [[149,162],[149,143]],
    //30
    [[149,143],[149,124]],
    //31
    [[149,257],[161,257]],
    //32
    [[149,238],[161,238]],
    //33
    [[149,219],[161,219]],
    //34
    [[149,200],[161,200]],
    //35
    [[149,181],[161,181]],
    //36
    [[149,162],[161,162]],
    //37
    [[149,143],[161,143]],
    //38
    [[149,124],[161,124]],
    //39
    [[149,270],[248,270]],
    //40
    [[248,270],[248,257]],
    //41
    [[248,257],[248,238]],
    //42
    [[248,238],[248,219]],
    //43
    [[248,219],[248,200]],
    //44
    [[248,200],[248,181]],
    //45
    [[248,181],[248,162]],
    //46
    [[248,162],[248,143]],
    //47
    [[248,143],[248,124]],
    //48
    [[248,257],[236,257]],
    //49
    [[248,238],[236,238]],
    //50
    [[248,219],[236,219]],
    //51
    [[248,200],[236,200]],
    //52
    [[248,181],[236,181]],
    //53
    [[248,162],[236,162]],
    //54
    [[248,143],[236,143]],
    //55
    [[248,124],[236,124]],
    //56
    [[149,124],[149,110]],
    //57
    [[149,110],[126,110]],
    //58
    [[149,110],[149,90]],
    //59
    [[149,90],[126,90]],
    //60
    [[149,90],[256,90],[256,68],[376,68],[376,109],[365,109]],
    //61
    [[248,270],[381,270],[381,19],[335,19]],
    //62
    [[335,19],[335,29]],
    //63
    [[335,19],[299,19],[299,29]],
    //64
    [[335,48],[335,80]],
    //65
    [[299,48],[299,80]],
    // enable line
    //66 opcode->controler
    [[278,118],[278,160]],
    //67 r1
    [[295,118],[295,145]],
    //68 r2


];
var InstructionfetchCycle = [
    [1,2],              //0
    [0],                //1
    [0,11],             //2
    [62,60,12,14,38],   //3
    [1,2],              //4
    [0],                //5
    [0,11],             //6 
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
    [0],                //19
    [0,11],             //20
    [8,19,21,38],       //21
    [7],                //22
    [0],                //23
    [0,11],
    [20,21,9,10],
    [13,14,15,38],
    [20,21],
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
     * setColor - 色を設定する
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
    MAR = new Block(51,30,45,18,"MAR");
    MARunder = new Block(51,60,45,18,"");
    MDR = new MDRBlock(19,116,45,18,"MDR");
    PR = new Block(161,30,45,18,"PR");
    SP = new Block(161,60,45,18,"SP");
    FR = new frBlock(111,170,"FR");
    Opcode = new opcodeBlock(268,100,"");
    r1 = new registerBlock(289,100,"");
    r2 = new registerBlock(304,100,"");
    adr = new addressBlock(321,100,"");
    Decoder = new decoderBlock(263,80,"Decoder");
    Controler = new controlerBlock(263,160,"Controler");
    Adder = new AdderBlock();
    ALU = new ALUBlock();
    for(var i = 0;i < 8;i++){
        GR.push(new Block(161,114+18*i+1*i,45,18,""));
        GRLabel.push(new Block(206,114+18*i+1*i,30,18,""));
        GRLabel[i].setText("GR"+i);
        GR[i].setText(toHex(registerHexGet(i)));
    }
    IRLabel.push(new Block(326-52,30,45,18,"IR"));
    IRLabel.push(new Block(320,30,45,18,""));

    //LinePatern add (id:65以降非表示)
    for(var i=0;i<LinePatern.length;i++){
        COMETLine.push(new Cometp5Line(i));
    }
    noLoop();
}

var inc = 0;
/**
 *
 *
 */
function draw(){
    background(255);
    //Emulator counter
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
 * @param {number} address - レジスターアドレス
 */
function registerCometSync(address){
    if(address >= 0 && address <= 7){
        let registerval = registerHexGet(address);//.replace('#','');
        GR[address].setText(toHex(registerval));
        GR[address].setUdecNumber(registerval);
    }
}
/**
 * flagRegisterTableとCOMETIIの値を同期させる
 *
 */
function flagRegisterCometSync(){
    let f = overflowFlagGet().toString() + signFlagGet().toString() + zeroFlagGet().toString();
    FR.setText(f);
}
/**
 *
 * prtableとCOMETIIのprを同期させる
 * @param {*} value
 */
function prCometSync(value){
    PR.setText(toHex(value));
}
function mousePressed(){
}


