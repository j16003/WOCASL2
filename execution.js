window.addEventListener('DOMContentLoaded', onLoadExe);
function onLoadExe() {
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
    // 「アセンブル」ボタンの制御
    document.querySelector('#btnAssemble').addEventListener('click', () => {
        assembleMemoryRegister();
    });
    // 「アセンブル」ボタンの制御
    document.querySelector('#btnStepExecution').addEventListener('click', () => {
        execute();
    });
}
function assembleMemoryRegister() {
    let register = document.getElementById('Registertable');
    let memory = document.getElementById('Memorytable');
    let stack = document.getElementById('Stacktable');
    
}
function LAD(pr){
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

    if(op == '10'){
        let addr = memoryUdecGet(pr+1);
        registerAllSet(r1,memoryUdecGet(addr+registerUdecGet(r2)));
        return 2;
    }else{
        registerAllSet(r1,registerUdecGet(r2));
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
let beforePC=0;
function execute(){
    let pr = prUdecGet();
    let literal = memoryLiteralGet(pr);
    let length;
    memoryTableRowColorSet(beforePC,"#FFFFFF");
    memoryTableRowColorSet(pr,"#FF0000");
    memoryScrollset(pr);
    beforePC=pr;
    switch (literal){
        case "LD":
            length = cometLD(pr);
            break;
        case "LAD":
            length = LAD(pr);
            break;
        case "ST":
            length = cometST(pr);
            break;
        default:
            length = 1;
        break;
    }
    prValueSet(length+pr);
}
