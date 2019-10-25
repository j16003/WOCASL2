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
            url: 'https://fast-river-46694.herokuapp.com/GCASL',
            type: 'POST',
            dataType: 'json',
            // フォーム要素の内容をハッシュ形式に変換
            data:{
                'code' : editor.getValue(),
            }
          })
          .done(function(data) {
            ajaxJsonToMemoryMap(data);
          })
          .fail(function() {
              // 通信失敗時の処理を記述
          });
    });
    // 「ステップ実行」ボタンの制御
    document.querySelector('#btnStepExecution').addEventListener('click', () => {
        execute();
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
        ans = registerSdecGet(r1) >> (addr+registerUdecGet(r2)+16);
    }else{
        ans = ans & 0x0000FFFF;
        ans = registerSdecGet(r1) >> (addr+registerUdecGet(r2)+16);
    }
    if((registerSdecGet(r1) >>> (addr+registerUdecGet(r2)+15)) & 0x0001 == 0x0001){
        overflowFlagSet(1);
    }else{
        overflowFlagSet(0);
    }
    registerAllSet(r1,ans);
    zeroFlagSet(ans);
    signFlagSet(ans);
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
        default:
            length = 1;
        break;
    }
    prValueSet(length+pr);
}
