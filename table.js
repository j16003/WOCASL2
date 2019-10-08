/*------------------------------------------------
jQuery でプログラム的にテーブルを作成する
--------------------------------------------------*/
//TODO Tableの幅を直す
$(document).ready(function () {
    var r_end = 500;  // 行数
    var c_end = 6;  // 列数 
    memory_Area = document.getElementById('memory_area');
    var tableJQ = $('<table id="Memorytable">');
    for (var r = 0; r < r_end; r++) {
        var r000 = toHex(r);
        var trJQ_r = $('<tr></tr>').appendTo(tableJQ);
        for (var c = 0; c < c_end; c++) {
            var c000 = c;
            if(c == 0){
                $('<td>' + r000 + '</td>').appendTo(trJQ_r);
            }else if(c == 1){
                $('<td>' +  r + ':' + '</td>').appendTo(trJQ_r);
            }else if(c == 2){
                $('<td>#0000</td>').appendTo(trJQ_r);
            }else if(c == 3){
                $('<td>0</td>').appendTo(trJQ_r);
            }else if(c == 4){
                $('<td>0</td>').appendTo(trJQ_r);
            }else if(c == 5){
                $('<td>0000 0000 0000 0000</td>').appendTo(trJQ_r);
            }              
       }
    }
    $(memory_Area).append(tableJQ);
});

//2進数変換
function toBin(v) {
    if(v >= 0){
        v = (('0000000000000000' + v.toString(2).toUpperCase()).substr(-16));
    }else{
        v = v >>> 0;
        v = (('0000000000000000' + v.toString(2).toUpperCase()).substr(-16));
    }
    let bin = "";
    for(let i = 1 ; i <= v.length ; i++){
        bin += v[i-1];
        if(i % 4 == 0 && i != v.length){
            bin +=" ";
        }
    }
    return bin
}

//16進数変換
function toHex(v) {
    if(v >= 0){
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }else{
        v = v >>> 0;
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }
}

//符号付10進数オーバーフロー
function toSdecOver(v){
    if(v > 32767 || v < -32768){
        v = v % 32767 - v;
    }
    if(v > 0){
        v = '+' + v;
    }
    return v
}

//符号なし10進数オーバーフロー
function toUdecOver(v){
    if(v > 65535){
        v = (v - 1) % 65535;
    }else if(v < 0){
        v = 65535 + (v + 1)%65535;
    }
    return v
}

//レジスタの値を表示する関数
function registerHexSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 1 ].firstChild.data = toHex(value);
}

function registeruDecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toUdecOver(value);
}

function registersDecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toSdecOver(value);
}

function registerBinSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toBin(value);
}

function registerAllSet(address,value){
    let table = document.getElementById('Memorytable');
    registerHexSet(address,value);
    registeruDecSet(address,value);
    registersDecSet(address,value);
    registerBinSet(address,value);
}

//メモリの値を表示する関数
function memoryHexSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toHex(value);
}

function memoryuDecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toUdecOver(value);
}

function memorysDecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toSdecOver(value);
}

function memoryBinSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 5 ].firstChild.data = toBin(value);
    
}

function memoryAllSet(address,value){
    let table = document.getElementById('Memorytable');
    memoryHexSet(address,value);
    memoryuDecSet(address,value);
    memorysDecSet(address,value);
    memoryBinSet(address,value);
}