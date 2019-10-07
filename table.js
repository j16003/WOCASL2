/*------------------------------------------------
jQuery でプログラム的にテーブルを作成する
--------------------------------------------------*/
//TODO Tableの幅を直す
$(document).ready(function () {
    var r_end = 500;  // 行数
    var c_end = 3;  // 列数 
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
            }else{
                $('<td>#0000</td>').appendTo(trJQ_r);
            }            
       }
    }
    $(memory_Area).append(tableJQ);
});

function toHex(v) {
    return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
}

function memoryHexSet(addless,value){
    let table = document.getElementById('Memorytable');
    table.rows[ addless ].cells[ 2 ].firstChild.data = toHex(value);
}