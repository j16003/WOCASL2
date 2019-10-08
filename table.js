/*------------------------------------------------
jQuery でプログラム的にテーブルを作成する
--------------------------------------------------*/
// jQuery start
// create table
// rows  :500
// cells :6
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

// toBin 2進数に変換する
// 引数 
// v        :  値
// 戻り値
// string   :  値
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

// toHex 16進数に変換する
// 引数 
// v        :  値
// 戻り値
// string   :  値
function toHex(v) {
    if(v >= 0){
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }else{
        v = v >>> 0;
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }
}

// toSdecOver 符号あり10進数のオーバーフローを検知、整形する
// 引数 
// v        :  値
// 戻り値
// string   :  値
function toSdecOver(v){
    if(v > 32767 || v < -32768){
        v = v % 32767 - v;
    }
    if(v > 0){
        v = '+' + v;
    }
    return v
}

// toUdecOver 符号なし10進数のオーバーフローを検知、整形する
// 引数 
// v        :  値
// 戻り値
// v        :  値
function toUdecOver(v){
    if(v > 65535){
        v = (v - 1) % 65535;
    }else if(v < 0){
        v = 65535 + (v + 1)%65535;
    }
    return v
}

// registerHexSet Registertableの16進数の値を書き換える
// 引数 
// address  :  Registertableの番地
// value    :  値
function registerHexSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 1 ].firstChild.data = toHex(value);
}

// registerUdecSet Registertableの符号なし10進数の値を書き換える
// 引数 
// address  :  Registertableの番地
// value    :  値
function registerUdecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toUdecOver(value);
}

// registerSdecSet Registertableの符号あり10進数の値を書き換える
// 引数 
// address  :  Registertableの番地
// value    :  値
function registerSdecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toSdecOver(value);
}

// registerBinSet Registertableの2進数の値を書き換える
// 引数 
// address  :  Registertableの番地
// value    :  値
function registerBinSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toBin(value);
}

// registerAllSet Registertableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
// 引数 
// address  :  Registertableの番地
// value    :  値
function registerAllSet(address,value){
    let table = document.getElementById('Registertable');
    registerHexSet(address,value);
    registerUdecSet(address,value);
    registerSdecSet(address,value);
    registerBinSet(address,value);
}

// memoryHexSet Memorytableの16進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memoryHexSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toHex(value);
}
// memoryUdecSet Memorytableの符号なし10進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memoryUdecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toUdecOver(value);
}

// memorySdecSet Memorytableの符号あり10進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memorySdecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toSdecOver(value);
}

// memoryBinSet Memorytableの2進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memoryBinSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 5 ].firstChild.data = toBin(value);
    
}

// memoryAllSet Memorytableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memoryAllSet(address,value){
    let table = document.getElementById('Memorytable');
    memoryHexSet(address,value);
    memoryUdecSet(address,value);
    memorySdecSet(address,value);
    memoryBinSet(address,value);
}

// toOverflowFlagSet Overflow Flagを設定する
// 引数 
// v        :  値
function toOverflowFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 0 ].firstChild.data = '〇';
    }else{
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 0 ].firstChild.data = '☆';
    }
}

// toOverflowFlagSet Overflow Flagを設定する
// 引数 
// v        :  値
function toOverflowFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 1 ].firstChild.data = '〇';
    }else{
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 1 ].firstChild.data = '☆';
    }
}

// toSignFlagSet Sign Flagを設定する
// 引数 
// v        :  値
function toSignFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 5 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 2 ].firstChild.data = '正';
    }else{
        table.rows[ 13 ].cells[ 5 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 2 ].firstChild.data = '負';
    }
}

// toZeroFlagSet Zero Flagを設定する
// 引数 
// v        :  値
function toZeroFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 6 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 3 ].firstChild.data = 'NonZ';
    }else{
        table.rows[ 13 ].cells[ 6 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 3 ].firstChild.data = 'Zero';
    }
}