window.addEventListener('DOMContentLoaded', onLoadExe);
function onLoadExe() {
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
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

function assembleMemoryRegister() {
    let register = document.getElementById('Registertable');
    let memory = document.getElementById('Memorytable');
    let stack = document.getElementById('Stacktable');
    
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
        zeroFlagSet(memoryUdecGet(addr+registerUdecGet(r2)));
        signFlagSet(memoryUdecGet(addr+registerUdecGet(r2)));
        return 2;
    }else{
        registerAllSet(r1,registerUdecGet(r2));
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

    if(op == '23'){
        let addr = memoryUdecGet(pr+1);
        ans = registerUdecGet(r1) - memoryUdecGet(addr+registerUdecGet(r2));
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 2;
    }else{
        ans = registerUdecGet(r1) - registerUdecGet(r2);
        registerAllSet(r1,ans);
        ofUdecFlagSet(ans);
        zeroFlagSet(ans);
        signFlagSet(ans);
        return 1;
    }
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
        default:
            length = 1;
        break;
    }
    prValueSet(length+pr);
}
