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

function toBin(v) {
    v = (('0000000000000000' + v.toString(2).toUpperCase()).substr(-16));
    let bin = "";
    for(let i = 1 ; i <= v.length ; i++){
        bin += v[i-1];
        if(i % 4 == 0 && i != v.length){
            bin +=" ";
        }
    }
    return bin
}

function toHex(v) {
    return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
}

function registerHexSet(addless,value){
    let table = document.getElementById('Registertable');
    table.rows[ addless ].cells[ 1 ].firstChild.data = toHex(value);
}

function registeruDecSet(addless,value){
    let table = document.getElementById('Registertable');
    table.rows[ addless ].cells[ 2 ].firstChild.data = value;
}

function registersDecSet(addless,value){
    let table = document.getElementById('Registertable');
    if(value > 0){
        table.rows[ addless ].cells[ 3 ].firstChild.data = '+' + value;
    }else{
        table.rows[ addless ].cells[ 3 ].firstChild.data = value;
    }
}

function registerBinSet(addless,value){
    let table = document.getElementById('Registertable');
    table.rows[ addless ].cells[ 4 ].firstChild.data = toBin(value);
    
}

function memoryHexSet(addless,value){
    let table = document.getElementById('Memorytable');
    table.rows[ addless ].cells[ 2 ].firstChild.data = toHex(value);
}

function memoryuDecSet(addless,value){
    let table = document.getElementById('Memorytable');
    table.rows[ addless ].cells[ 3 ].firstChild.data = value;
}

function memorysDecSet(addless,value){
    let table = document.getElementById('Memorytable');
    if(value > 0){
        table.rows[ addless ].cells[ 4 ].firstChild.data = '+' + value;
    }else{
        table.rows[ addless ].cells[ 4 ].firstChild.data = value;
    }
}

function memoryBinSet(addless,value){
    let table = document.getElementById('Memorytable');
    table.rows[ addless ].cells[ 5 ].firstChild.data = toBin(value);
    
}