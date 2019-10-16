let demoData = '{"result":"OK","code" :[{"Code":0,"Addr":0,"AddrLabel":"","Op":0,"Length":1,"Label":{"Label":"PRG","Index":0,"Address":0},"Token":{"Literal":"START"}},{"Code":4624,"Addr":4,"AddrLabel":"A","Op":18,"Length":2,"Token":{"Literal":"LAD"}},{"Code":5153,"Addr":0,"AddrLabel":"","Op":20,"Length":1,"Token":{"Literal":"LD"}},{"Code":0,"Addr":10,"AddrLabel":"","Op":0,"Length":1,"Label":{"Label":"A","Index":1,"Address":4},"Token":{"Literal":"DC"}}]}';
/*------------------------------------------------
jQuery でプログラム的にテーブルを作成する
--------------------------------------------------*/
// jQuery start
// create table
// rows  :500
// cells :6
$(document).ready(function () {
    var r_end = 500;  // 行数
    var c_end = 7;  // 列数 
    memory_Area = document.getElementById('memory_area');
    stack_Area = document.getElementById('stack_area');
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
            }else{
                $('<td hidden>LAD</td>').appendTo(trJQ_r);

            }            
       }
    }
    $(memory_Area).append(tableJQ);
    jsonParseToMemoryMap(demoData);
    var r_end = 200;
    tableJQ = $('<table id="Stacktable">');
    for (var r = 0; r < (r_end + 1); r++) {
        var r000 = toHex(65537 - ((r_end + 2) - r));
        var trJQ_r = $('<tr></tr>').appendTo(tableJQ);
        for (var c = 0; c < c_end; c++) {
            var c000 = c;
            if(c == 0){
                $('<td>' + r000 + '</td>').appendTo(trJQ_r);
            }else if(c == 1){
                $('<td>#0000</td>').appendTo(trJQ_r);
            }else if(c == 2){
                $('<td>0</td>').appendTo(trJQ_r);
            }else if(c == 3){
                $('<td>0</td>').appendTo(trJQ_r);
            }else if(c == 4){
                $('<td>0000 0000 0000 0000</td>').appendTo(trJQ_r);
            }              
       }
    }
    $(stack_Area).append(tableJQ);
    let stacktable = document.getElementById('Stacktable');
    let stackPosition = stacktable.rows[r_end].offsetTop;
    $(stack_Area).scrollTop(stackPosition);
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

// registerScrollset Registertableの要素位置にスクロールを設定する
// 引数 
// address  :  Registertableの番地
function registerScrollset(address){
    let table = document.getElementById('Registertable');
    let register_Area = document.getElementById('register_area');
    let position = table.rows[address].offsetTop;
    $(register_Area).scrollTop(position);
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

// registerHexGet Registertableの16進数の値を取得する
// 引数 
// address  :  Registertableの番地
// 戻り値
// string   :  値
function registerHexGet(address){
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 1 ].firstChild.data;
    v = parseInt(v.replace('#',''), 16);
    return v
}

// registerUdecGet Registertableの符号なし10進数の値を取得する
// 引数 
// address  :  Registertableの番地
// 戻り値
// string   :  値
function registerUdecGet(address){
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 2 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// registerSdecGet Registertableの符号あり10進数の値を取得する
// 引数 
// address  :  Registertableの番地
// 戻り値
// string   :  値
function registerSdecGet(address){
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// registerBinGet Registertableの2進数の値を取得する
// 引数 
// address  :  Registertableの番地
// 戻り値
// string   :  値
function registerBinGet(address){
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 4 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
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

// memoryLiteralSet MemorytableのLiteralの値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function memoryLiteralSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 6 ].firstChild.data = value;
}

// memoryScrollset Memorytableの要素位置にスクロールを設定する
// 引数 
// address  :  Memorytableの番地
function memoryScrollset(address){
    let table = document.getElementById('Memorytable');
    let memory_Area = document.getElementById('memory_area');
    let position = table.rows[address].offsetTop;
    $(memory_Area).scrollTop(position);
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

// memoryHexGet Memorytableの16進数の値を取得する
// 引数 
// address  :  Memorytableの番地
// 戻り値
// string   :  値
function memoryHexGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 2 ].firstChild.data;
    v = parseInt(v.replace('#',''), 16);
    return v
}

// memoryUdecGet Memorytableの符号なし10進数の値を取得する
// 引数 
// address  :  Memorytableの番地
// 戻り値
// string   :  値
function memoryUdecGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// memorySdecGet Memorytableの符号あり10進数の値を取得する
// 引数 
// address  :  Memorytableの番地
// 戻り値
// string   :  値
function memorySdecGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 4 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// memoryBinGet Memorytableの2進数の値を取得する
// 引数 
// address  :  Memorytableの番地
// 戻り値
// string   :  値
function memoryBinGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 5 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
}

// toOverflowFlagSet Overflow Flagを設定する
// 引数 
// v        :  値
function overflowFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 0 ].firstChild.data = '〇';
    }else{
        table.rows[ 13 ].cells[ 4 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 0 ].firstChild.data = '☆';
    }
}

// toOverflowFlagGet RegistertableのOverflow Flagの値を取得する
// 戻り値
// string   :  値
function overflowFlagGet(){
    let table = document.getElementById('Registertable');
    var v = table.rows[ 13 ].cells[ 4 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// toSignFlagSet Sign Flagを設定する
// 引数 
// v        :  値
function signFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 5 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 2 ].firstChild.data = '正';
    }else{
        table.rows[ 13 ].cells[ 5 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 2 ].firstChild.data = '負';
    }
}

// toSignFlagGet RegistertableのSign Flagの値を取得する
// 戻り値
// string   :  値
function signFlagGet(){
    let table = document.getElementById('Registertable');
    var v = table.rows[ 13 ].cells[ 5 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// toZeroFlagSet Zero Flagを設定する
// 引数 
// v        :  値
function zeroFlagSet(value){
    let table = document.getElementById('Registertable');
    if(value == 0){
        table.rows[ 13 ].cells[ 6 ].firstChild.data = 0;
        table.rows[ 13 ].cells[ 3 ].firstChild.data = 'NonZ';
    }else{
        table.rows[ 13 ].cells[ 6 ].firstChild.data = 1;
        table.rows[ 13 ].cells[ 3 ].firstChild.data = 'Zero';
    }
}

// toZeroFlagGet RegistertableのZero Flagの値を取得する
// 戻り値
// string   :  値
function zeroFlagGet(){
    let table = document.getElementById('Registertable');
    var v = table.rows[ 13 ].cells[ 6 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackHexSet Stacktableの16進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackHexSet(address,value){
    let table = document.getElementById('Stacktable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toHex(value);
}

// stackUdecSet Stacktableの符号なし10進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackHexSet(address,value){
    let table = document.getElementById('Stacktable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toHex(value);
}

// stackSdecSet Stacktableの符号あり10進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackHexSet(address,value){
    let table = document.getElementById('Stacktable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toHex(value);
}

// stackSdecSet Stacktableの16進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackHexSet(address,value){
    let table = document.getElementById('Stacktable');
    table.rows[ address ].cells[ 5 ].firstChild.data = toHex(value);
}

// stackScrollset Stacktableの要素位置にスクロールを設定する
// 引数 
// address  :  stacktableの番地
function stackScrollset(address){
    let table = document.getElementById('Stacktable');
    let stack_Area = document.getElementById('stack_area');
    address = 0xFFFF-address;
    let r_end = 200;
    let position = table.rows[r_end-address].offsetTop;
    $(stack_Area).scrollTop(position);
    
}

// stackAllSet Stacktableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function stackAllSet(address,value){
    let table = document.getElementById('Stacktable');
    memoryHexSet(address,value);
    memoryUdecSet(address,value);
    memorySdecSet(address,value);
    memoryBinSet(address,value);
}

// stackHexGet Stacktableの16進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackHexGet(address){
    let table = document.getElementById('Stacktable');
    var v = table.rows[ address ].cells[ 2 ].firstChild.data;
    v = parseInt(v.replace('#',''), 16);
    return v
}

// stackUdecGet Stacktableの符号なし10進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackUdecGet(address){
    let table = document.getElementById('Stacktable');
    var v = table.rows[ address ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackUdecGet Stacktableの符号あり10進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackUdecGet(address){
    let table = document.getElementById('Stacktable');
    var v = table.rows[ address ].cells[ 4 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackBinGet stacktableの2進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackBinGet(address){
    let table = document.getElementById('Stacktable');
    var v = table.rows[ address ].cells[ 5 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
}

// jsonParseToMemoryMap memorytableにjsonファイルの値を読み込む
// 引数 
// json  :  文字列
function jsonParseToMemoryMap(json){
    let mox = json;
    mox.replace(/\\n/g, "\\n")  
    .replace(/\\'/g, "\\'")
    .replace(/\//g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    obj = JSON.parse(mox);
    if(obj["result"]==undefined){
        alert("Result is undefined");
    }else if(obj["result"]=="OK"){
        let address= 0;
        obj["code"].forEach(element => {
            memoryAllSet(address,element.Code);
            memoryLiteralSet(address,element.Token.Literal);
            if(element.Token.Literal=="DC"){
                memoryAllSet(address,element.Addr); 
            }
            if(element.Length == 2){
                memoryAllSet(address+1,element.Addr); 
            }
            address += element.Length;
        });
    }else{
        let address= 0;
        obj["error"].forEach(element => {
            alert(element.Message);
        });
    }
}

// memoryTableRowColorSet Memorytableの行の色を変更する
// 引数 
// address  :  Memorytableの番地
// color    :  値
function memoryTableRowColorSet(address,color){
    let table = document.getElementById('Memorytable');
    table.rows[address].style.backgroundColor=color;
}

// registerTableRowColorSet Registertableの行の色を変更する
// 引数 
// address  :  Registertableの番地
// color    :  値
function registerTableRowColorSet(address,color){
    let table = document.getElementById('Registertable');
    table.rows[address].style.backgroundColor=color;
}

// stackTableRowColorSet Stacktableの行の色を変更する
// 引数 
// address  :  Stacktableの番地
// color    :  値
function stackTableRowColorSet(address,color){
    address = 0xFFFF-address;
    let r_end = 200;
    let table = document.getElementById('Stacktable');
    table.rows[r_end-address].style.backgroundColor=color;
}

