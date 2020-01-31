

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
 * @class OpcodeBlock
 * @extends {Block}
 */
class OpcodeBlock extends Block{
    constructor(x,y,label){
        super(x,y,20,18,label);
        this.str = "00";
        
    }
    /**
     *
     *
     * @param {string} label
     * @memberof OpcodeBlock
     */
    setLabel(label){
        this.label = label;
    }
    /**
     *
     *
     * @param {string} str
     * @memberof OpcodeBlock
     */
    setText(str){
            this.str = str;
    }
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof OpcodeBlock
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

                        //this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

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

                        if(r1.getUdecNumber() != 0){
                            this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                            COMETLine[66].active();
                            COMETLine[68].active();
                        }

                        if(memoryLengthGet(this.address) == 1){
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

                        if(r1.getUdecNumber() != 0){
                            this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                            COMETLine[66].active();
                            COMETLine[68].active();
                        }
                        
                        //r2が0以外の時は指標レジスタ有効のためALUにアクセスする
                        if(r2.getUdecNumber() != 0){
                            GR[r2.getUdecNumber()].active();
                            GRLabel[r2.getUdecNumber()].active();
                            this.registerAddressActiveLine(r2.getUdecNumber());
                            COMETLine[55].active();
                            COMETLine[56].active();
                        }

                    break;
                    case 11:
                        Adder.active();
                        adr.active();
                        MARunder.active();
                        Controler.active();
                        r2.active();
                        
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        MARunder.setUdecNumber(adr.getUdecNumber());
                        if(r2.getUdecNumber() > 0){
                            MARunder.setUdecNumber(MARunder.getUdecNumber()+registerUdecGet(r2.getUdecNumber()));
                        }
                        MARunder.setText(toHex(MARunder.getUdecNumber()));

                        //r2が0以外の時は指標レジスタ有効のためALUにアクセスする
                        if(r2.getUdecNumber() != 0){
                            GR[r2.getUdecNumber()].active();
                            GRLabel[r2.getUdecNumber()].active();
                            this.registerAddressActiveLine(r2.getUdecNumber());
                            COMETLine[55].active();
                            COMETLine[56].active();
                            COMETLine[68].active();
                        }

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
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        COMETLine[67].inactive();
                    break;
                    case 13:
                        Controler.active();
                        MAR.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        COMETLine[67].inactive();
                    break;
                    case 14:
                        MAR.active();
                        MDR.active();
                        Controler.active();
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        COMETLine[67].inactive();
                    break;
                    case 15:
                        FR.active();
                        ALU.active();
                        Controler.active();
                        Decoder.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();

                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        registerAllSet(r1.getUdecNumber(),MDR.getUdecNumber());
                        this.registerALUActiveLine(r1.getUdecNumber());
                        COMETLine[67].inactive();
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
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
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
                    case 20:
                        MAR.active();
                        MDR.active();
                        r1.active();
                        Controler.active();
                        //memoryAllSet(MAR.getUdecNumber(),registerUdecGet(r1.getUdecNumber()));
                        cometST(this.address);
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
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometADDA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        //registerAllSet(r1.getUdecNumber(),registerUdecGet(r1.getUdecNumber())+MDR.getUdecNumber());
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
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometADDA(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //SUBA GR1,Addr
            case 11:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometSUBA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //SUBA GR1,GR2
            case 12:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometADDA(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //ADDL GR1,10
            case 13:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometADDL(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //ADDL GR1,GR2
            case 14:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometADDL(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //AND GR1,Addr
            case 15:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometAND(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //AND GR1,GR2
            case 16:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometAND(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //OR GR1,Addr
            case 17:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometOR(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //OR GR1,GR2
            case 18:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometOR(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //XOR GR1,Addr
            case 19:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        r1.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r1.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometXOR(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //XOR GR1,GR2
            case 20:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometXOR(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //CPA GR1, Addr
            case 21:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometCPA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //CPA GR1,GR3
            case 22:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometCPA(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //CPL GR1,Addr
            case 23:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());

                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometCPA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //CPL GR1,GR3
            case 24:
                switch(this.counter){
                    case 27:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 28:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        r2.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        Opcode.active();
                        Decoder.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                    break;
                    case 29:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        GR[r2.getUdecNumber()].active();
                        GRLabel[r2.getUdecNumber()].active();
                        cometCPA(this.address);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        FR.active();
                        ALU.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //SLA GR1,100
            case 25:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometSLA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //SRL GR1,100
            case 26:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometSRA(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //SLL GR1,100
            case 27:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometSLL(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //SRL GR1,100
            case 0x53:
                switch(this.counter){
                    case 22:
                        MAR.active();
                        MARunder.active();
                        MAR.setText(MARunder.getText());
                        MAR.setUdecNumber(MARunder.getUdecNumber());
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 23:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 24:
                        MAR.active();
                        this.memoryLineAddress = MAR.getUdecNumber();
                        memoryTableRowColorSet(this.memoryLineAddress,"success");
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                        MDR.active();
                        Controler.active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    case 25:
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        MDR.active();
                        COMETLine[37-r1.getUdecNumber()].active();
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                        Controler.active();
                    break;
                    case 26:
                        ALU.active();
                        r2.active();
                        GR[r1.getUdecNumber()].active();
                        GRLabel[r1.getUdecNumber()].active();
                        Controler.active();
                        FR.active();
                        this.registerControlActiveLine(r1.getUdecNumber());
                        cometSRL(this.address);
                        this.registerAccsessLine(r1.getUdecNumber(),r2.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //JMI Addr,100
            case 0x61:
                switch(this.counter){
                    case 30:
                        var address = cometJMI(this.address);
                        if(address != 2){
                            prValueSet(this.address+address);
                            COMETLine[4].active();
                            COMETLine[5].active();
                        }
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //JNZ Addr,100
            case 0x62:
                switch(this.counter){
                    case 30:
                        var address = cometJNZ(this.address);
                        if(address != 2){
                            prValueSet(this.address+address);
                            COMETLine[4].active();
                            COMETLine[5].active();
                        }
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //JZE Addr,100
            case 0x63:
                switch(this.counter){
                    case 30:
                        var address = cometJZE(this.address);
                        if(address != 2){
                            prValueSet(this.address+address);
                            COMETLine[4].active();
                            COMETLine[5].active();
                        }
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //JUMP Addr,100
            case 0x64:
                switch(this.counter){
                    case 31:
                        prValueSet(cometJUMP(this.address));
                        MARunder.active();
                        PR.active();
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //JPL Addr,100
            case 0x65:
                switch(this.counter){
                    case 30:
                        var address = cometJPL(this.address);
                        if(address != 2){
                            prValueSet(this.address+address);
                            COMETLine[4].active();
                            COMETLine[5].active();
                        }
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //JOV Addr,100
            case 0x66:
                switch(this.counter){
                    case 30:
                        var address = cometJOV(this.address);
                        if(address != 2){
                            prValueSet(this.address+address);
                            COMETLine[4].active();
                            COMETLine[5].active();
                        }
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //PUSH    
            case 0x70:
                switch(this.counter){
                    case 32:
                        SP.active();
                        Controler.active();
                        registerAllSet(9,SP.getUdecNumber()-1);
                    break;
                    case 33:
                        MAR.active();
                        MARunder.active();
                        MDR.active();
                        MAR.setText(SP.getText());
                        MAR.setUdecNumber(SP.getUdecNumber());
                    break;
                    case 34:
                        MAR.active();
                        MDR.active();
                        registerAllSet(9,SP.getUdecNumber()+1);
                        cometPUSH(this.address);
                        Controler.active();
                    break;
                    default:
                        return 0;
                }
            break;
            //POP
            case 0x71:
                switch(this.counter){
                    case 35:
                        SP.active();
                        MAR.active();
                        MAR.setText(SP.getText());
                        MAR.setUdecNumber(SP.getUdecNumber());
                        Controler.active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                    break;
                    case 36:
                        SP.active();
                        registerAllSet(9,SP.getUdecNumber()+1);
                        MAR.active();
                        Controler.active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                    break;
                    case 37:
                        SP.active();
                        MDR.active();
                        Controler.active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(memoryUdecGet(MAR.getUdecNumber())));
                    break;
                    case 38:
                        MDR.active();
                        Decoder.active();
                        Opcode.active();
                        r1.active();
                        this.registerAccsessLine(r1.getUdecNumber(),0);
                        this.registerControlActiveLine(r1.getUdecNumber());
                        Controler.active();
                        registerAllSet(9,SP.getUdecNumber()-1);
                        cometPOP(this.address);
                    break;
                    default:
                        return 0;
                }
            break;
            //CALL
            case 0x80:
                switch(this.counter){
                    case 39:
                        SP.active();
                        Controler.active();
                        registerAllSet(9,SP.getUdecNumber()-1);
                    break;
                    case 40:
                        SP.active();
                        Controler.active();
                        MAR.active();
                        MAR.setText(SP.getText());
                        MAR.setUdecNumber(SP.getUdecNumber());
                    break;
                    case 41:
                        MAR.active();
                        MDR.active();
                        Controler.active();
                        PR.active();
                        MDR.setUdecNumber(registerUdecGet(8));
                        MDR.setText(PR.getText());
                    break;
                    case 42:
                        MDR.active();
                        MAR.active();
                        Controler.active();
                        memoryAllSet(registerUdecGet(9),MDR.getUdecNumber());
                        stackTableRowColorSet(registerUdecGet(9),'#00FF00');
                        stackTableRowColorSet(registerUdecGet(9)+1,'#FFFFFF');
                    break;
                    case 43:
                        Controler.active();
                        MARunder.active();
                        PR.active();
                        prValueSet(MARunder.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            //RET
            case 0x81:
                switch(this.counter){
                    case 44:
                        if(registerUdecGet(9)>=0xFFFF){
                            infoModal("プログラム終了");
                            cometExecuteStop();
                            this.counter=44;
                            return 0;
                        }
                        Decoder.active();
                        Controler.active();
                        SP.active();
                        MAR.active();
                        Opcode.active();
                        MAR.setUdecNumber(registerUdecGet(9));
                        MAR.setText(toHex(registerUdecGet(9)));
                    break;
                    case 45:
                        Decoder.active();
                        Controler.active();
                        SP.active();
                        MAR.active();
                        Opcode.active();
                        registerAllSet(9,SP.getUdecNumber()+1);
                        stackTableRowColorSet(registerUdecGet(9),'#00FF00');
                        stackTableRowColorSet(SP.getUdecNumber(),'#FFFFFF');
                    break;
                    case 46:
                        Decoder.active();
                        Controler.active();
                        MAR.active();
                        MDR.active();
                        Opcode.active();
                        MDR.setUdecNumber(memoryUdecGet(MAR.getUdecNumber()));
                        MDR.setText(toHex(MDR.getUdecNumber()));
                    break;
                    case 47:
                        Decoder.active();
                        Controler.active();
                        MAR.active();
                        MDR.active();
                        Opcode.active();
                        PR.active();
                        prValueSet(MDR.getUdecNumber());
                    break;
                    default:
                        return 0;
                }
            break;
            case 0x00:
                return 0;
            break;
            case 0xF0:
                cometSVC(this.address);
                return 0;
            break;
            }
        //再描画
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
    registerAddressActiveLine(gr){
        let n = 30 - gr;
        for(var i= n;i<30;i++){
            COMETLine[i].active();
        }
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
    registerAccsessLine(r1,r2){
        let col = "#00FF00";
        if(r2 > 0){
            col = "#00FFFF";
            COMETLine[67].active();
        }

        COMETLine[69+r1].active();
        COMETLine[69+r1].setColor("#00FF00");

        if(COMETLine[69+r2].getActive()){
            COMETLine[69+r2].setColor("#00FFFF");
        }else{
            COMETLine[69+r2].setColor("#0000FF");
        }

        if(r1 > 0){
            COMETLine[66].active();
            COMETLine[68].active();
        }

        if(r1 != 0 && r1 != 7){
            COMETLine[76+r1].active();
            COMETLine[76+r1].setColor("#00FF00");
        }
        if(r2 != 0 && r2 != 7){
            if(COMETLine[76+r2].getActive()){
                COMETLine[76+r2].setColor("#00FFFF");
            }else{
                COMETLine[76+r2].active();
                COMETLine[76+r2].setColor("#0000FF");
            }
        }

        for(var i= 71;i < 71 + r1 - 1 && r1 >= 2;i++){
            COMETLine[i].active();
            COMETLine[i].setColor("#00FF00");
        }

        for(var i= 71;i < 71 + r2 - 1 && r2 >= 2;i++){
            if(!COMETLine[i].getActive()){
                COMETLine[i].active();
                COMETLine[i].setColor("#0000FF");
            }else{
                COMETLine[i].setColor("#00FFFF");
            }
        }

        COMETLine[68].setColor(col);
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
            //LD GR1,Addr
            case 0x10:
                this.mode = 5;
            break;
            //ST GR1,Addr
            case 0x11:
                this.mode = 7;
                this.counter = 17;
            break;
            //LAD GR1,Addr
            case 0x12:
                this.mode = 8;
                this.counter = 20;
            break;
            //LD GR1,GR2
            case 0x14:
                this.mode = 6;
                this.counter = 15;
            break;
            //ADDA 
            case 0x20:
                this.mode = 9;
                this.counter = 21;
            break;
            case 0x24:
                this.mode = 10;
                this.counter = 26;
            break;
            //SUBA
            case 0x21:
                this.mode = 11;
                this.counter = 29;
            break;
            case 0x25:
                this.mode = 12;
                this.counter = 26;
            break;
            //ADDL
            case 0x22:
                this.mode = 13;
                this.counter = 21;
            break;
            case 0x26:
                this.mode = 14;
                this.counter = 26;
            break;
            //AND
            case 0x30:
                this.mode = 15;
                this.counter = 21;
            break;
            case 0x34:
                this.mode = 16;
                this.counter = 26;
            break;
            //OR
            case 0x31:
                this.mode = 17;
                this.counter = 21;
            break;
            case 0x35:
                this.mode = 18;
                this.counter = 26;
            break;
            //XOR
            case 0x32:
                this.mode = 19;
                this.counter = 21;
            break;
            case 0x36:
                this.mode = 20;
                this.counter = 26;
            break;
            //CPA
            case 0x40:
                this.mode = 21;
                this.counter = 21;
            break;
            case 0x44:
                this.mode = 22;
                this.counter = 26;
            break;
            //CPL
            case 0x41:
                this.mode = 23;
                this.counter = 21;
            break;
            case 0x45:
                this.mode = 24;
                this.counter = 26;
            break;
            //SLA
            case 0x50:
                this.mode = 25;
                this.counter = 21;
            break;
            //SRA
            case 0x51:
                this.mode = 26;
                this.counter = 21;
            break;
            //SLL
            case 0x52:
                this.mode = 27;
                this.counter = 21;
            break;
            //SRA
            case 0x53:
                this.mode = op;
                this.counter = 21;
            break;
            //JMI
            case 0x61:
                this.mode = op;
                this.counter = 29;
            break;
            //JNZ
            case 0x62:
                this.mode = op;
                this.counter = 29;
            break;
            //JZE
            case 0x63:
                this.mode = op;
                this.counter = 29;
            break;
            //JUMP
            case 0x64:
                this.mode = op;
                this.counter = 30;
            break;
            //JPL
            case 0x65:
                this.mode = op;
                this.counter = 29;
            break;
            //JOV
            case 0x66:
                this.mode = op;
                this.counter = 29;
            break;
            //PUSH
            case 0x70:
                this.mode = op;
                this.counter = 31;
            break;
            //POP
            case 0x71:
                this.mode = op;
                this.counter = 34;
            break;
            //CALL
            case 0x80:
                this.mode = op;
                this.counter = 38;
            break;
            //CALL
            case 0x81:
                this.mode = op;
                this.counter = 43;
            break;
            //RET
            case 0x00:
                this.mode = op;
                this.counter = 100;
            break;
            //SVC
            case 0xF0:
                this.mode = op;
                this.counter = 100;
            break;
            default:
                alert("未定義op : "+op);
            break;
        }  
    }
}

class controlerBlock extends Block{
    /**
     * Creates an instance of controlerBlock.
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
/**
 *
 *
 * @class AdderBlock
 * @extends {Block}
 */
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
/**
 *
 *
 * @class ALUBlock
 * @extends {Block}
 */
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
    [[296,118],[296,150]],
    //68 r2
    [[311,118],[311,150],[296,150]],
    //69
    [[296,150],[256,150]],
    //70
    [[256,138],[256,119],[236,119]],
    //71
    [[256,150],[256,138]],
    //72
    [[256,150],[256,157]],
    //73
    [[256,157],[256,176]],
    //74
    [[256,176],[256,195]],
    //75
    [[256,195],[256,214]],
    //76
    [[256,214],[256,233]],
    //77
    [[256,233],[256,252],[236,252]],
    //78
    [[256,138],[236,138]],
    //79
    [[256,157],[236,157]],
    //80
    [[256,176],[236,176]],
    //81
    [[256,195],[236,195]],
    //82
    [[256,214],[236,214]],
    //83
    [[256,233],[236,233]],



];
// Cycle別CPUラインの表示パターン定義
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
    [65],               //9
    [58,59],            //10
    [16,58,59],         //11
    [7],                //12
    [0],                //13
    [0,11,66,68],       //14
    [9,10,13,14,15,66,68],//15
    [15,20,21,66,68],   //16
    [13,14,15,38],      //17
    [18,19,21],         //18
    [0],                //19
    [0,11],             //20
    [8,19,21,38],       //21
    //ADDA~XOR
    [7,66,68],          //22
    [0,66,68],          //23
    [0,11,66,68],       //24
    [20,21,9,10,66,68], //25
    [13,14,15,38,66,68],//26
    [20,21,66,68],      //27
    [20,21,66,68],      //28
    [13,14,15,38],      //29
    //JUMP系統
    [],                 //30
    [4,5],              //31
    [],                 //32             
    [1,38,18],          //33
    [0],                //34
    //POP
    [1,3,66,68],        //35
    [0,66,68],          //36
    [11,66,68],         //37
    [12,14,38,66,68],   //38
    [],                 //39
    [1,3],              //40
    [0],                //41
    [0,11],             //42
    [5,4],              //43
    [1,3],              //44
    [0],                //45
    [0,11],             //46
    [4,6],
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
        if (this.id >= 65){
            this.disable = true;
        }else{
            this.color = color(255,0,0);
        }
    }
    /**
     * Lineを非アクティブ(黒色)にする
     *
     * @memberof Cometp5Line
     */
    inactive(){
        if(this.id >= 65){
            this.disable = false;
        }else{
            this.color = color(0,0,0);
        }
    }
    getActive(){
        return this.disable;
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
    Opcode = new OpcodeBlock(268,100,"");
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
    //TODO id:65 color red
    COMETLine[65].setColor("#FF0000");
    //TODO id:66 color green
    COMETLine[66].setColor("#00FF00");
    //TODO id:67 color blue
    COMETLine[67].setColor("#0000FF");
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
    SP.setText(toHex(registerHexGet(9)));
    SP.setUdecNumber(registerHexGet(9));
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
    PR.setUdecNumber(value);
}
function mousePressed(){
}


