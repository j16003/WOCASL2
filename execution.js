window.addEventListener('DOMContentLoaded', onLoadExe);
function onLoadExe() {
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
    // 「リセット」ボタンの制御
    document.querySelector('#btnReset').addEventListener('click', () => {
        initMemoryRegister();
    });
    // 「アセンブル」ボタンの制御
    document.querySelector('#btnAssemble').addEventListener('click', () => {
        //メモリレジスタスタック初期化
        initMemoryRegister();
        $.ajax({
            url: 'http://localhost:8080/GCASL',
            type: 'POST',
            dataType: 'json',
            // フォーム要素の内容をハッシュ形式に変換
            data:{
                'code' : editor.getValue(),
            }
          })
          .done(function(data) {
            console.log(data);
            ajaxJsonToMemoryMap(data);
          })
          .fail(function() {
              alert("通信失敗");
              // 通信失敗時の処理を記述
          });
    });
    // 「実行」ボタンの制御
    document.querySelector('#btnExecution').addEventListener('click', () => {
        //let literal = memoryLiteralGet(pr);
        for(i = 3;i != execute();){
            execute();
        }
    });
    // 「ステップ実行」ボタンの制御
    document.querySelector('#btnStepExecution').addEventListener('click', () => {
        execute();
    });
    // 「ステップバック」ボタンの制御
    document.querySelector('#btnStepBack').addEventListener('click', () => {
        //execute();
    });
}


function cometLAD(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let addr = memoryUdecGet(pr+1);
    registerAllSet(r1,addr+registerUdecGet(r2));
    return 2;
}

function cometLD(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    overflowFlagSet(0);
    if(op == '10'){
        let addr = memoryUdecGet(pr+1);
        registerAllSet(r1,memoryUdecGet(addr+registerUdecGet(r2)));
        overflowFlagSet(0);
        
        zeroFlagSet(memoryUdecGet(addr+registerUdecGet(r2)));
        signFlagSet(memoryUdecGet(addr+registerUdecGet(r2)));
        return 2;
    }else{
        registerAllSet(r1,registerUdecGet(r2));
        overflowFlagSet(0);
        zeroFlagSet(registerUdecGet(r2));
        signFlagSet(registerUdecGet(r2));
        return 1;
    }
}

function cometST(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let addr = memoryUdecGet(pr+1);
    memoryAllSet(addr+registerUdecGet(r2),registerUdecGet(r1));
    return 2;
}

function cometADDA(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '20'){
        let addr = memoryUdecGet(pr+1);
        ans = registerSdecGet(r1) + memorySdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerSdecGet(r1) + registerSdecGet(r2);
        registerAllSet(r1,ans);
        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometSUBA(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '21'){
        let addr = memoryUdecGet(pr+1);
        ans = registerSdecGet(r1) - memorySdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerSdecGet(r1) - registerSdecGet(r2);
        registerAllSet(r1,ans);
        ofSdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometADDL(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '22'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) + memoryUdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) + registerUdecGet(r2);
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometSUBL(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0;
    let ans2 = 0; 

    if(op == '23'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) - memoryUdecGet(addr+registerUdecGet(r2));
        ans2 = registerSdecGet(r1) - memorySdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans2);
        zeroFlagSet(ans2);
        signFlagSet(ans2);
        return 2;
    }else{
        ans = registerUdecGet(r1) - registerUdecGet(r2);
        ans2 = registerSdecGet(r1) - registerSdecGet(r2);
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans2);
        zeroFlagSet(ans2);
        signFlagSet(ans2);
        return 1;
    }
}

function cometAND(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '30'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) & memoryUdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) & registerUdecGet(r2);
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometOR(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '31'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) | memoryUdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) | registerUdecGet(r2);
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometXOR(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '32'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) ^ memoryUdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) ^ registerUdecGet(r2);
        registerAllSet(r1,ans);
        overflowFlagSet(0);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
}

function cometCPA(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '40'){
        let addr = memoryUdecGet(pr+1);
        ans = registerSdecGet(r1) - memorySdecGet(addr+registerUdecGet(r2));
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
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let op=opcode[1]+opcode[2];
    let ans = 0; 

    if(op == '41'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) - memoryUdecGet(addr+registerUdecGet(r2));
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
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let ans = 0;
    let sign = 0; 
    let addr = memoryUdecGet(pr+1);

    ans = registerSdecGet(r1) << (addr+registerUdecGet(r2));
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
    registerAllSet(r1,ans);
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSRA(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let ans = 0;
    let sign = 0; 
    let addr = memoryUdecGet(pr+1);

    ans = registerSdecGet(r1);
    sign = registerSdecGet(r1) & 0x8000;
    if(sign == 0x8000){
        ans = ans | 0x80000000;
    }else{
        ans = ans & 0x0000FFFF;
    }
    ans = registerSdecGet(r1) >> (addr+registerUdecGet(r2));
    if((registerSdecGet(r1) >>> (addr+registerUdecGet(r2)-1)) & 0x0001 == 0x0001){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSet(r1,ans);
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSLL(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let ans = 0;
    let addr = memoryUdecGet(pr+1);

    ans = registerSdecGet(r1) << (addr+registerUdecGet(r2));
    if((ans & 0x10000) == 0x10000){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    ans = ans & 0xFFFF;
    registerAllSet(r1,ans);
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometSRL(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let r2 = opcode[4];
    let ans = 0;
    let addr = memoryUdecGet(pr+1);

    ans = registerSdecGet(r1) & 0x0000FFFF;
    ans = ans >>> (addr+registerUdecGet(r2));
    if((registerSdecGet(r1) >>> (addr+registerUdecGet(r2)-1)) & 0x0001 == 0x0001){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSet(r1,ans);
    zeroFlagSet(ans);
    signFlagSet(ans);
    return 2;
}

function cometJUMP(pr){
    let opcode = memoryHexGet(pr);
    let r2 = opcode[4];
    let addr = memoryUdecGet(pr+1);
    let address = addr+registerUdecGet(r2);
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
    let opcode = memoryHexGet(pr);
    let r2 = opcode[4];
    let addr = memoryUdecGet(pr+1);
    let address = addr+registerUdecGet(r2);
    let sp = registerUdecGet(9);
    sp -= 1;
    stackAllSet(sp,address);
    registerAllSet(9,sp);
    
    
    return 2;
}

function cometPOP(pr){
    let opcode = memoryHexGet(pr);
    let r1 = opcode[3];
    let sp = registerUdecGet(9);
    let val = stackUdecGet(sp);

    if(sp != 0xFFFF){
        sp += 1;
        registerAllSet(9,sp);
        registerAllSet(r1,val);
    }else if(sp == 0xFFFE){
        sp += sp;
    }else{
        errorModal("実行時エラー：<br>スタックポインタが0xFFFFのためPOPできません<br>動作を終了します");
        return 0;
    }
    
    return 1;
}

function cometCALL(pr){
    let opcode = memoryHexGet(pr);
    let r2 = opcode[4];
    let addr = memoryUdecGet(pr+1);
    let address = addr+registerUdecGet(r2);
    let sp = registerUdecGet(9);
    sp -= 1;
    stackAllSet(sp,pr+2);
    registerAllSet(9,sp);
    
    return address-pr;
}

function cometRET(pr){
    let opcode = memoryHexGet(pr);
    let addr = memoryUdecGet(pr+1);
    let sp = registerUdecGet(9);
    let address =stackUdecGet(sp)
    
    if(sp != 0xFFFF){
        registerAllSet(9,sp+1);
    }else if(sp == 0xFFFE){
        sp += sp
    }else{
        infoModal("プログラムが終了しました");
        return 0x10000;
    }
    return address-pr;
}

function cometSVC(pr){
    let adr = memoryHexGet(pr+1);
    alert(adr);
    switch(adr){
        case "#703A":
                $('#inputModal').modal('show');

            break;
        case "#02AB":

            break;
        default://IN,OUT以外はNOP
            break;
    }
    return 2;
}

let beforePC=0;

function execute(){
    let pr = prUdecGet();
    let literal = memoryLiteralGet(pr);
    let length;

    beforePC=pr;
    switch (literal){
        case "LD":
            $('#inputModal').modal('toggle');
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
            length = 1;
        break;
    }
    prValueSet(abs(length+ prUdecGet()));
}
