window.addEventListener('DOMContentLoaded', onLoadExe);
var cometExecute = null;
var COMETEmu = new CometEmulator();
//cpu cycle
const COMETCYCLE = 1;
/**
 *
 * Pair型の構造体
 */
class Pair{
    /**
     *Creates an instance of Pair.
     * @param {*} first - first 
     * @param {*} second - second
     * @memberof Pair
     */
    constructor(first,second){
        this.first = first;
        this.second = second;
    }
}
/**
 * StepStruct Stepの構造体
 * レジスターやメモリ・フラグ・スタックの状態を管理
 */ 
class StepStruct{
    /**
     *Creates an instance of StepStruct.
     * @param {number} memory
     * @memberof StepStruct
     */
    constructor(memory){
        this.register = document.getElementById("Registertable").cloneNode(true);
        this.memory = memory;
        this.flag = document.getElementById("Flagtable").cloneNode(true);
        this.stack = null;
    }
    /**
     * Stackの状態をsetする
     * @param {number} stack - stackの状態(1の場合Stackを1つ進める)
     * @memberof StepStruct
     */
    setStack(stack){
        this.stack=stack;
    }
}

/**
 *
 * StepBackControl StepStructのデータ操作用
 * @class StepBackControl
 */
class StepBackControl{
    constructor(){
        this.stepBackArray = new Array();
    }
    setStep(step){
        this.stepBackArray.push(step);
        //console.log(step);
    }
    removeStep(){
        if(this.stepBackArray.length > 0){
        
            let struct = this.stepBackArray.pop();
            let flagtable = document.getElementById("Flagtable");
            //register table
            for(var i=3;i<=9;i++){
                registerAllSet(i-3,struct.register.rows[i].cells[2].firstChild.data);
            }
            //program register
            prValueSet(parseInt(struct.register.rows[1].cells[2].firstChild.data));
            //stack 
            if(struct.stack != null){
                if(struct.stack > 0){
                    stackTableRowColorSet(registerUdecGet(9)+struct.stack,'#00FF00');
                    stackTableRowColorSet(registerUdecGet(9),'#FFFFFF');
                }else{
                    stackTableRowColorSet(registerUdecGet(9)+struct.stack,'#66FFFF');
                    stackTableRowColorSet(registerUdecGet(9),'#FFFFFF');
                }
                registerAllSet(9,registerUdecGet(9)+struct.stack)
            }
            //memory table
            if(struct.memory != null){
                struct.memory.forEach(element => {
                    memoryAllSet(element.first,element.second);
                });
            }
            //flag Table 
            for(var i = 0; i < 7; i++){
                flagtable.rows[1].cells[i].firstChild.data = struct.flag.rows[1].cells[i].firstChild.data;
            }
        }
    }
}


/**
 * 
 * CASL2の実行ボタンのdisableを設定
 * @param {boolean} flag
 */
function setEnableCaslButton(flag){
    if($("#btnStepBack").prop("disabled") != flag){
        $("#btnStepBack").prop("disabled", flag);
        $("#btnExecution").prop("disabled", flag);
        $("#btnStepExecution").prop("disabled", flag);
        $("#btnStop").prop("disabled", flag);
    }
}
/**
 *
 * setExecuteButton btnStepBackとbtnStepExecutionのdisableの値をセットする
 * @param {boolean} flag - trueで有効、falseで無効
 */
function setExecuteButton(flag){
    $("#btnStepBack").prop("disabled", flag);
    $("#btnStepExecution").prop("disabled", flag);
}

function onLoadExe() {
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
    // 「リセット」ボタンの制御
    document.querySelector('#btnReset').addEventListener('click', () => {
        initMemoryRegister();
        setEnableCaslButton(true);
    });
    document.querySelector('#btnShare').addEventListener('click', () => {
        $.ajax({
            url: 'http://localhost:8080/GCASL2/add',
            type: 'POST',
            dataType: 'json',
            // フォーム要素の内容をハッシュ形式に変換
            data:{
                'code' : JSON.stringify(sessionToJSON(editor.session)),
            }
          })
          .done(function(data) {
            alert(data);
        })
    });
    // 「アセンブル」ボタンの制御
    document.querySelector('#btnAssemble').addEventListener('click', () => {
        //メモリレジスタスタック初期化
        initMemoryRegister();
        $.ajax({
            url: 'https://fast-river-46694.herokuapp.com/GCASL',
            type: 'POST',
            dataType: 'json',
            // フォーム要素の内容をハッシュ形式に変換
            data:{
                'code' : editor.getValue(),
            }
          })
          .done(function(data) {
            prValueSet(0);
            ajaxJsonToMemoryMap(data);
            prValueSet(0);
        })
          .fail(function() {
            errorModal("通信失敗 </br>ネットワークに接続しているか確認してください。");
              // 通信失敗時の処理を記述
          });
    });
    // 「実行」ボタンの制御
    document.querySelector('#btnExecution').addEventListener('click', () => {
        //let literal = memoryLiteralGet(pr);
        /*for(i = 3;i != execute();){
            execute();
        }*/
        setExecuteButton(true);
        cometExecuteStart();
    });
    // 「ステップ実行」ボタンの制御
    document.querySelector('#btnStepExecution').addEventListener('click', () => {
        execute();
    });
    // 「ステップバック」ボタンの制御
    document.querySelector('#btnStepBack').addEventListener('click', () => {
        StepBackControler.removeStep();
    });
    //
    document.querySelector('#btnStop').addEventListener('click', () => {
        cometExecuteStop();
        setExecuteButton(false);
    });
    //ショートカットキーの制御
    $(document).keydown(function(e){

        switch (e.keyCode){
            case 13://Enter
                $("#btnStepExecution").click();
                break;
            case 8://Back Space
                $("#btnStepBack").click();
                break;
            case 113://F2
                $("#btnReset").click();
                break;
            case 115://F4
                $("#btnAssemble").click();
                break;
            //TODO Debug Mode リリース時に削除
            case 120://F9 
                $("#customSwitches").prop("disabled",  !$("#customSwitches").prop("disabled"));
                break;
        }
    });
}


/**
 * cometExecuteStart 実行
 *
 */
function cometExecuteStart(){
    cometExecuteStop();
    cometExecute = setInterval(() => {
        execute();
    }, COMETCYCLE);
}
/**
 * cometExecuteStop 停止
 *
 */
function cometExecuteStop(){
    if(cometExecute != null){
        clearInterval(cometExecute);
    }
}

/**
 *
 * cometLAD LAD命令
 * @param {number} pr プログラムレジスタ
 * @returns {number} 命令語長
 */
function cometLAD(pr){
    StepBackControler.setStep(new StepStruct(null));
    
    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }
    registerAllSetAndColor(r1,addr,"primary");
    return 2;
}

function cometLD(pr){
    //
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    overflowFlagSet(0);
    if(op == '10'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        registerAllSetAndColor(r1,memoryUdecGet(addr),"primary");
        overflowFlagSet(0);
        zeroFlagSet(memoryUdecGet(addr));
        signFlagSet(memoryUdecGet(addr));
        return 2;
    }else{
        registerAllSetAndColor(r1,registerUdecGet(r2),"primary");
        overflowFlagSet(0);
        zeroFlagSet(registerUdecGet(r2));
        signFlagSet(registerUdecGet(r2));
        return 1;
    }
}

function cometST(pr){
    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }
    let mem = Array(new Pair(addr,memoryUdecGet(addr)));
    StepBackControler.setStep(new StepStruct (mem));
    memoryAllSet(addr,registerUdecGet(r1));

    return 2;
}

function cometADDA(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '20'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerSdecGet(r1) + memorySdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");

        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerSdecGet(r1) + registerSdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");

        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometSUBA(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '21'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerSdecGet(r1) - memorySdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");

        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerSdecGet(r1) - registerSdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");

        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometADDL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '22'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) + memoryUdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");

        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) + registerUdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");

        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometSUBL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0;
    let ans2 = 0; 

    if(op == '23'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) - memoryUdecGet(addr);
        ans2 = registerSdecGet(r1) - memorySdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");

        ofUdecFlagSet(ans2);
        zeroFlagSet(ans2);
        signFlagSet(ans2);
        return 2;
    }else{
        ans = registerUdecGet(r1) - registerUdecGet(r2);
        ans2 = registerSdecGet(r1) - registerSdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");

        ofUdecFlagSet(ans2);
        zeroFlagSet(ans2);
        signFlagSet(ans2);
        return 1;
    }
}

function cometAND(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '30'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) & memoryUdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");

        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) & registerUdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometOR(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '31'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) | memoryUdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) | registerUdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometXOR(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '32'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) ^ memoryUdecGet(addr);
        registerAllSetAndColor(r1,ans,"primary");
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) ^ registerUdecGet(r2);
        registerAllSetAndColor(r1,ans,"primary");
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometCPA(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '40'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerSdecGet(r1) - memorySdecGet(addr);
        ofSdecFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerSdecGet(r1) - registerSdecGet(r2);
        ofSdecFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometCPL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '41'){
        let addr = memoryUdecGet(pr+1);
        if(parseInt(r2) > 0){
            addr += registerUdecGet(r2);
        }
        ans = registerUdecGet(r1) - memoryUdecGet(addr);
        ofUdecFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) - registerUdecGet(r2);
        ofUdecFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometSLA(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let ans = 0;
    let sign = 0; 
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }

    ans = registerSdecGet(r1) << (addr);
    sign = registerSdecGet(r1) & 0x8000;
    if(sign == 0x8000){
        ans = ans | sign;
    }else{
        ans = ans & 0x17FFF;
    }
    if((ans & 0x10000) == 0x10000){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSetAndColor(r1,ans,"primary");
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSRA(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let ans = 0;
    let sign = 0; 
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }

    ans = registerSdecGet(r1);
    sign = registerSdecGet(r1) & 0x8000;
    if(sign == 0x8000){
        ans = ans | 0x80000000;
    }else{
        ans = ans & 0x0000FFFF;
    }
    ans = registerSdecGet(r1) >> (addr);
    if((registerSdecGet(r1) >>> (addr-1)) & 0x0001 == 0x0001){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSetAndColor(r1,ans,"primary");
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSLL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let ans = 0;
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }
    ans = registerSdecGet(r1) << (addr);
    if((ans & 0x10000) == 0x10000){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    ans = ans & 0xFFFF;
    registerAllSetAndColor(r1,ans,"primary");
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSRL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let r2 = parseInt(opcode[4]);
    let ans = 0;
    let addr = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        addr += registerUdecGet(r2);
    }
    ans = registerSdecGet(r1) & 0x0000FFFF;
    ans = ans >>> (addr);
    if((registerSdecGet(r1) >>> (addr-1)) & 0x0001 == 0x0001){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSetAndColor(r1,ans,"primary");
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometJUMP(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r2 = parseInt(opcode[4]);
    let address = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        address += registerUdecGet(r2);
    }
    
    if(address > memoryTableMaxRow){
        errorModal("実行時エラー：<br>分岐命令で異常な値を検知しました。</br>"+pr+"行目の命令");
        return 0;
    }
    memoryScrollset(address);
    
    return address-pr;
}

function cometJPL(pr){

    if(signFlagGet() == 0 && zeroFlagGet() == 0){
        return cometJUMP(pr);
    }
    return 2;
}

function cometJMI(pr){

    if(signFlagGet() == 1){
        return cometJUMP(pr);
    }
    return 2;
}

function cometJNZ(pr){

    if(zeroFlagGet() == 0){
        return cometJUMP(pr);
    }
    return 2;
}

function cometJZE(pr){

    if(zeroFlagGet() == 1){
        return cometJUMP(pr);
    }
    return 2;
}

function cometJOV(pr){

    if(overflowFlagGet() == 1){
        return cometJUMP(pr);
    }
    return 2;
}

function cometPUSH(pr){
    let stepstruct = new StepStruct(null);
    
    let opcode = memoryHexGet(pr);
    let r2 = parseInt(opcode[4]);
    let address = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        address += registerUdecGet(r2);
    }
    let sp = registerUdecGet(9);
    stepstruct.setStack(1);
    sp -= 1;
    stackAllSet(sp,address);
    registerAllSet(9,sp);
    //stackTableRowColorSet(sp,'#00FF00');
    //stackTableRowColorSet(sp+1,'#FFFFFF');
    StepBackControler.setStep(stepstruct);
    return 2;
}

function cometPOP(pr){
    let stepstruct = new StepStruct(null);

    let opcode = memoryHexGet(pr);
    let r1 = parseInt(opcode[3]);
    let sp = registerUdecGet(9);
    let val = stackUdecGet(sp);

    if(sp != 0xFFFF){
        sp += 1;
        registerAllSet(9,sp);
        registerAllSet(r1,val);
        //stackTableRowColorSet(sp,'#66FFFF');
        //stackTableRowColorSet(sp-1,'#FFFFFF');
        stepstruct.setStack(-1);
        StepBackControler.setStep(stepstruct);
    }else if(sp == 0xFFFE){
        sp += sp;
    }else{
        errorModal("実行時エラー：<br>スタックポインタが0xFFFFのためPOPできません<br>動作を終了します");
        return 0;
    }
    
    return 1;
}

function cometCALL(pr){
    StepBackControler.setStep(new StepStruct(null));

    let opcode = memoryHexGet(pr);
    let r2 = parseInt(opcode[4]);
    let address = memoryUdecGet(pr+1);
    if(parseInt(r2) > 0){
        address += registerUdecGet(r2);
    }
    let sp = registerUdecGet(9);
    sp -= 1;
    stackAllSet(sp,pr+2);
    registerAllSet(9,sp);
    
    return address-pr;
}

function cometRET(pr){
    let sp = registerUdecGet(9);
    let address =stackUdecGet(sp)
    
    if(sp != 0xFFFF){
        registerAllSet(9,sp+1);
    }else if(sp == 0xFFFE){
        sp += sp
    }else{
        infoModal("プログラムが終了しました");
        cometExecuteStop();
        return 0x10000;
    }
    return address-pr;
}

function cometSVC(pr){
    let adr = memoryHexGet(pr+1);
    let opcode1 = registerUdecGet(1);
    let opcode2 = registerUdecGet(2);
    switch(adr){
        case "#703A":
            cometExecuteStop();
            $('#inputModal').modal('show');
            break;
        case "#02AB":
            let word = "";
            for(let i = opcode1,index = 0 ; i < opcode1 + memoryUdecGet(opcode2) && index <= 256 ; i++,index++){
                word = word + hexToWord(memoryUdecGet(i));
            }
            cometExecuteStop();
            infoModal(word);
            break;
        default://IN,OUT以外はNOP
            break;
    }
    return 2;
}


let beforePC=0;

/**
 * execute プログラムレジスタのさすメモリ番地の命令を実行
 * 
 */
function execute(){
    let pr = prUdecGet();
    let literal = memoryLiteralGet(pr);
    let length;
    beforePC = pr;
    for(let i=0;i<=7;i++){
        registerTableRowColorSet(i,"light");
    }
    //COMETII Mode On
    if($("#customSwitches").prop("checked")){
        if(COMETEmu.execute()){
            return 0;
        }
        COMETEmu.reset();
        return 0;
    }
    switch (literal){
        case "LD":
            length = cometLD(pr);
            break;
        case "LAD":
            length = cometLAD(pr);
            break;
        case "ST":
            length = cometST(pr);
            break;
        case "ADDA":
            length = cometADDA(pr);
            break;
        case "SUBA":
            length = cometSUBA(pr);
            break;
        case "ADDL":
            length = cometADDL(pr);
            break;
        case "SUBL":
            length = cometSUBL(pr);
            break;
        case "AND":
            length = cometAND(pr);
            break;  
        case "OR":
            length = cometOR(pr);
            break; 
        case "XOR":
            length = cometXOR(pr);
            break; 
        case "CPA":
            length = cometCPA(pr);
            break;
        case "CPL":
            length = cometCPL(pr);
            break; 
        case "SLA":
            length = cometSLA(pr);
            break;
        case "SRA":
            length = cometSRA(pr);
            break;
        case "SLL":
            length = cometSLL(pr);
            break;
        case "SRL":
            length = cometSRL(pr);
            break;
        case "JUMP":
            length = cometJUMP(pr);
            break;
        case "JPL":
            length = cometJPL(pr);
            break;
        case "JMI":
            length = cometJMI(pr);
            break;
        case "JNZ":
            length = cometJNZ(pr);
            break;
        case "JZE":
            length = cometJZE(pr);
            break;
        case "JOV":
            length = cometJOV(pr);
            break;
        case "PUSH":
            length = cometPUSH(pr);
            break;
        case "POP":
            length = cometPOP(pr);
            break;
        case "CALL":
            length = cometCALL(pr);
            break;
        case "SVC":
            length = cometSVC(pr);
            break;
        case "RET":
            length = cometRET(pr);
            if(length == 0x10000){
                length = 0;
                pr = 0;
                return 3;
            }
            break;
        case "END":
            length = 0;
            pr = 0;
            return 3;
        default:
            //NOP命令
            StepBackControler.setStep(new StepStruct(null));
            length = 1;
        break;
    }
    prValueSet(abs(length+ prUdecGet()));
    redraw();
}

function hexToWord(value){
    switch(value){
        case 0x0020:
            return " ";
        case 0x0021:
            return "!";
        case 0x0022:
            return "\"";
        case 0x0023:
            return "#";
        case 0x0024:
            return "$";
        case 0x0025:
            return "%";
        case 0x0026:
            return "&";
        case 0x0027:
            return "\'";
        case 0x0028:
            return "(";
        case 0x0029:
            return ")"; 
        case 0x002A:
            return "*";
        case 0x002B:
            return "+";
        case 0x002C:
            return ",";
        case 0x002D:
            return "-";
        case 0x002E:
            return ".";
        case 0x002F:
            return "/";
        case 0x0030:
            return "0";
        case 0x0031:
            return "1";
        case 0x0032:
            return "2";
        case 0x0033:
            return "3";
        case 0x0034:
            return "4";
        case 0x0035:
            return "5";
        case 0x0036:
            return "6";
        case 0x0037:
            return "7";
        case 0x0038:
            return "8";
        case 0x0039:
            return "9";
        case 0x003A:
            return ":";
        case 0x003B:
            return ";";
        case 0x003C:
            return "<";
        case 0x003D:
            return "=";
        case 0x003E:
            return ">";
        case 0x003F:
            return "?";
        case 0x0040:
            return "@";
        case 0x0041:
            return "A";
        case 0x0042:
            return "B";
        case 0x0043:
            return "C";
        case 0x0044:
            return "D";
        case 0x0045:
            return "E";
        case 0x0046:
            return "F";
        case 0x0047:
            return "G";
        case 0x0048:
            return "H";
        case 0x0049:
            return "I";
        case 0x004A:
            return "J";
        case 0x004B:
            return "K";
        case 0x004C:
            return "L";
        case 0x004D:
            return "M";
        case 0x004E:
            return "N";
        case 0x004F:
            return "O";
        case 0x0050:
            return "P";
        case 0x0051:
            return "Q";
        case 0x0052:
            return "R";
        case 0x0053:
            return "S";
        case 0x0054:
            return "T";
        case 0x0055:
            return "U";
        case 0x0056:
            return "V";
        case 0x0057:
            return "W";
        case 0x0058:
            return "X";
        case 0x0059:
            return "Y";
        case 0x005A:
            return "Z";
        case 0x005B:
            return "[";
        case 0x005C:
            return "\\";
        case 0x005D:
            return "]";
        case 0x005E:
            return "^";
        case 0x005F:
            return "_";
        case 0x0060:
            return "`";
        case 0x0061:
            return "a";
        case 0x0062:
            return "b";
        case 0x0063:
            return "c";
        case 0x0064:
            return "d";
        case 0x0065:
            return "e";
        case 0x0066:
            return "f";
        case 0x0067:
            return "g";
        case 0x0068:
            return "h";
        case 0x0069:
            return "i";
        case 0x006A:
            return "j";
        case 0x006B:
            return "k";
        case 0x006C:
            return "l";
        case 0x006D:
            return "m";
        case 0x006E:
            return "n";
        case 0x006F:
            return "o";
        case 0x0070:
            return "p";
        case 0x0071:
            return "q";
        case 0x0072:
            return "r";
        case 0x0073:
            return "s";
        case 0x0074:
            return "t";
        case 0x0075:
            return "u";
        case 0x0076:
            return "v";
        case 0x0077:
            return "w";
        case 0x0078:
            return "x";
        case 0x0079:
            return "y";
        case 0x007A:
            return "z";
        case 0x007B:
            return "{";
        case 0x007C:
            return "|";
        case 0x007D:
            return "}";
        case 0x007E:
            return "~";
        default:
            return "";
    }
}

function wordcode(value){
    switch(value){
        case " ":
            return 0x0020;
        case "!":
            return 0x0021;
        case "\"":
            return 0x0022;
        case "#":
            return 0x0023;
        case "$":
            return 0x0024;
        case "%":
            return 0x0025;
        case "&":
            return 0x0026;
        case "\'":
            return 0x0027;
        case "(":
            return 0x0028;
        case ")":
            return 0x0029; 
        case "*":
            return 0x002A;
        case "+":
            return 0x002B;
        case ",":
            return 0x002C;
        case "-":
            return 0x002D;
        case ".":
            return 0x002E;
        case "/":
            return 0x002F;
        case "0":
            return 0x0030;
        case "1":
            return 0x0031;
        case "2":
            return 0x0032;
        case "3":
            return 0x0033;
        case "4":
            return 0x0034;
        case "5":
            return 0x0035;
        case "6":
            return 0x0036;
        case "7":
            return 0x0037;
        case "8":
            return 0x0038;
        case "9":
            return 0x0039;
        case ":":
            return 0x003A;
        case ";":
            return 0x003B;
        case "<":
            return 0x003C;
        case "=":
            return 0x003D;
        case ">":
            return 0x003E;
        case "?":
            return 0x003F;
        case "@":
            return 0x0040;
        case "A":
            return 0x0041;
        case "B":
            return 0x0042;
        case "C":
            return 0x0043;
        case "D":
            return 0x0044;
        case "E":
            return 0x0045;
        case "F":
            return 0x0046;
        case "G":
            return 0x0047;
        case "H":
            return 0x0048;
        case "I":
            return 0x0049;
        case "J":
            return 0x004A;
        case "K":
            return 0x004B;
        case "L":
            return 0x004C;
        case "M":
            return 0x004D;
        case "N":
            return 0x004E;
        case "O":
            return 0x004F;
        case "P":
            return 0x0050;
        case "Q":
            return 0x0051;
        case "R":
            return 0x0052;
        case "S":
            return 0x0053;
        case "T":
            return 0x0054;
        case "U":
            return 0x0055;
        case "V":
            return 0x0056;
        case "W":
            return 0x0057;
        case "X":
            return 0x0058;
        case "Y":
            return 0x0059;
        case "Z":
            return 0x005A;
        case "[":
            return 0x005B;
        case "\\":
            return 0x005C;
        case "]":
            return 0x005D;
        case "^":
            return 0x005E;
        case "_":
            return 0x005F;
        case "`":
            return 0x0060;
        case "a":
            return 0x0061;
        case "b":
            return 0x0062;
        case "c":
            return 0x0063;
        case "d":
            return 0x0064;
        case "e":
            return 0x0065;
        case "f":
            return 0x0066;
        case "g":
            return 0x0067;
        case "h":
            return 0x0068;
        case "i":
            return 0x0069;
        case "j":
            return 0x006A;
        case "k":
            return 0x006B;
        case "l":
            return 0x006C;
        case "m":
            return 0x006D;
        case "n":
            return 0x006E;
        case "o":
            return 0x006F;
        case "p":
            return 0x0070;
        case "q":
            return 0x0071;
        case "r":
            return 0x0072;
        case "s":
            return 0x0073;
        case "t":
            return 0x0074;
        case "u":
            return 0x0075;
        case "v":
            return 0x0076;
        case "w":
            return 0x0077;
        case "x":
            return 0x0078;
        case "y":
            return 0x0079;
        case "z":
            return 0x007A;
        case "{":
            return 0x007B;
        case "|":
            return 0x007C;
        case "}":
            return 0x007D;
        case "~":
            return 0x007E;
        case "":
            return 0x007F;
        default:
            errorModal("文字コードに存在しない文字です");
            return 0;
    }
}

