window.addEventListener('DOMContentLoaded', onLoadExe);
function onLoadExe() {
    // フッター領域
    footerArea = document.getElementById('footer_fixed');
    // 「保存する」ボタンの制御
    document.querySelector('#btnExecution').addEventListener('click', () => {
        executionMemoryRegister();
    });
}
function executionMemoryRegister() {
    let register = document.getElementById('Registertable');
    let memory = document.getElementById('Memorytable');
    let stack = document.getElementById('Stacktable');
    
}
