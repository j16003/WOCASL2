
/*------------------------------------------------
jQuery でプログラム的にテーブルを作成する
--------------------------------------------------*/


/**
 * COMETIIメモリーテーブルの最大サイズを定義
 * @type {Number}
 */
const memoryTableMaxRow = 0x500;
/**
 * COMETIIスタックの最大サイズを定義
 * @type {Number} 
 */
const stackTableMaxRow = 200;
/**
 * StepBackコントローラを定義
 * @type {Object} 
 */
var StepBackControler;

$(document).ready(function () {
    //bootstrapのtooltipの初期化
    $('[data-toggle="tooltip"]').tooltip();
    var r_end = memoryTableMaxRow;  // 行数
    var c_end = 8;  // 列数 
    memory_Area = document.getElementById('memory_area');
    stack_Area = document.getElementById('stack_area');
    var tableJQ = $('<table id="Memorytable" class="table-hover">');
    for (var r = 0; r < r_end; r++) {
        var r000 = toHex(r);
        var trJQ_r = $('<tr class="table-light"></tr>').appendTo(tableJQ);
        //0
        $('<td>' + r000 + '</td>').appendTo(trJQ_r);
        //1
        $('<td>' +  r + '</td>').appendTo(trJQ_r);
        //2
        $('<td>#0000</td>').appendTo(trJQ_r);
        //3
        $('<td>0</td>').appendTo(trJQ_r);
        //4
        $('<td>0</td>').appendTo(trJQ_r);
        //5
        $('<td>0000 0000 0000 0000</td>').appendTo(trJQ_r);
        //6
        $('<td> </td>').appendTo(trJQ_r);
        //7
        $('<td hidden> </td>').appendTo(trJQ_r);
    }
    $(memory_Area).append(tableJQ);
    var r_end = stackTableMaxRow;
    tableJQ = $('<table id="Stacktable">');
    for (var r = 0; r < (r_end + 1); r++) {
        var r000 = toHex(65537 - ((r_end + 2) - r));
        var trJQ_r = $('<tr></tr>').appendTo(tableJQ);
        for (var c = 0; c < c_end; c++) {
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
    //input Modal hide Event
    $('#inputModal').on('hide.bs.modal',function(e){
        let inputdata = $('#input').val();;
        let inputlength = inputdata.length;
        
        memoryAllSet(registerUdecGet(2),inputlength);
        let mem = new Array();
        for(let i = 0;i < inputlength && i<=256 ;i++){
            mem.push(new Pair(registerUdecGet(1)+i,memoryUdecGet(registerUdecGet(1)+i)));
            if($.isNumeric(memoryLabelGet(registerUdecGet(1)+i))){
                memoryLabelSet(registerUdecGet(1)+i,'"'+inputdata[i]+'"');
            }
            memoryAllSet(registerUdecGet(1)+i,wordcode(inputdata[i]));
        }
        StepBackControler.setStep(new StepStruct(mem));
        if(cometExecute != null){
            cometExecuteStart();
        }
    });

});

//page load and resize Events
$(window).on('load resize', function(){
        let headerHeight = $('#header_fixed').height();
        let scrennheight = document.body.clientHeight - headerHeight;
        if($('#register_area').height() < scrennheight/2){
            $('#memory_area').height(scrennheight/2+(scrennheight/2-$('#register_area').height()));
        }else{
            $('#memory_area').height(scrennheight-$('#register_area').height());
        }
        $('#input_area').height(scrennheight);
        $('#stack_area').height(scrennheight/2-$('#flag_area').height());
        $('#comet_area').height(scrennheight/2);
});


/**
 * 10進数から整形された2進数に変換する
 * @param {number} v - 10進数引数
 * @return {string} 2進数を返す
 * @example 
 * var result = tobin(2);
 * // result = "0000 0000 0000 0010"
 */

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

/**
 *　toHex 16進数に変換する
 *
 * @param {number} v - 変換したい数値
 * @returns {string} vを16進数に変化して整形して返す
 */
function toHex(v) {
    if(v >= 0){
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }else{
        v = v >>> 0;
        return '#' + (('0000' + v.toString(16).toUpperCase()).substr(-4));
    }
}

/**
 *
 * 符号あり10進数のオーバーフローを検知、整形する
 * @param {number} v - 変換したい数値
 * @returns {string} 符号あり10進数に変換して返す(オーバーフローした場合は1周する)
 */
function toSdecOver(v){
    v = v&0xFFFF;
    if(v > 0 &&v <= 0x7FFF){
        v = '+' + v;
    }
    else{
        v = ((~v+1)&0xFFFF);
        if(v >0){
            v='-'+v;
        }
    }
    return v
}


/**
 * toUdecOver 符号なし10進数のオーバーフローを検知、整形する
 * 
 * @param {number} v - 変換したい数値
 * @returns {number} - 符号なし10進数に変換して戻す(オーバーフローした場合は1周する)
 */
function toUdecOver(v){
    if(v > 65535){
        v = (v - 1) % 65535;
    }else if(v < 0){
        v = 65535 + (v + 1)%65535;
    }
    return v&0xFFFF
}


/**
 * registerHexSet Registertableの16進数の値を書き換える
 *
 * @param {number} address - 値を入れたいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @param {number} value - レジスタに入れたい値
 */
function registerHexSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 1 ].firstChild.data = toHex(value);
}

/**
 * registerUdecSet Registertableの符号なし10進数の値を書き換える
 *
 * @param {number} address - 値を入れたいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @param {number} value - レジスタに入れたい値
 */
function registerUdecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toUdecOver(value);
}


/**
 * registerSdecSet Registertableの符号あり10進数の値を書き換える
 *
 * @param {number} address - 値を入れたいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @param {number} value - レジスタに入れたい値
 */
function registerSdecSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toSdecOver(value);
}

/**
 * registerBinSet Registertableの2進数の値を書き換える
 *
 * @param {number} address - 値を入れたいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @param {number} value - レジスタに入れたい値
 */
function registerBinSet(address,value){
    let table = document.getElementById('Registertable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toBin(value);
}



/**
 * registerAllSet Registertableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
 *
 * @param {number} address - 値を入れたいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @param {number} value - レジスタに入れたい値
 */
function registerAllSet(address,value){
    let adr = parseInt(address, 10);
    if(address >= 0 && address <= 7){
        adr += 3;
    }else if(address == 8||address == 9){
        adr -= 7;
    }
    registerHexSet(adr,value);
    registerUdecSet(adr,value);
    registerSdecSet(adr,value);
    registerBinSet(adr,value);
    registerCometSync(parseInt(address, 10));
}

/**
 * registerHexGet Registertableの16進数の値を取得する
 *
 * @param {number} address - 値を取得したいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @returns {String} - 16進数を返す
 */
function registerHexGet(address){
    if(address >= 0 && address <= 7){
        address += 3;
    }else if(address == 8||address == 9){
        address -= 7;
    }
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 1 ].firstChild.data;
    v = parseInt(v.replace('#',''), 16);
    return v
}


/**
 * registerUdecGet Registertableの符号なし10進数の値を取得する
 *
 * @param {number} address - 値を取得したいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @returns {number} - 符号なし10進数を返す
 */
function registerUdecGet(address){
    let adr = parseInt(address,10);
    if(address >= 0 && address <= 7){
        adr += 3;
    }else if(address == 8||address == 9){
        adr -= 7;
    }
    let table = document.getElementById('Registertable');
    var v = table.rows[ adr ].cells[ 2 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

/**
 * prUdecGet PrograCounter get value 
 *
 * @returns {number} - PRの値を符号なし10進数で返す
 */
function prUdecGet(){
    return parseInt(registerUdecGet(8),10);
}
/**
 * prValueSet PR set value and color set and scroll set and comet sync
 *
 * @param {number} value - PRに設定したい値
 */
function prValueSet(value){
    let pr = prUdecGet();
    selectLine(memoryLineGet(value));
    memoryTableRowColorSet(pr,"light");
    memoryTableRowColorSet(value,"primary");
    memoryScrollset(value);
    registerAllSet(8,value);
    prCometSync(prUdecGet());
}

/**
 * registerSdecGet Registertableの符号あり10進数の値を取得する
 * 
 * @param {number} address - 値を取得したいレジスタ番号（0~7:レジスタ、8:PR、9:SP)
 * @returns {number} - 符号あり10進数を返す
 */
function registerSdecGet(address){
    let adr = parseInt(address,10);
    if(address >= 0 && address <= 7){
        adr += 3;
    }else if(address == 8||address == 9){
        adr -= 7;
    }
    let table = document.getElementById('Registertable');
    var v = table.rows[ adr ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}


/**
 * registerBinGet Registertableの2進数の値を取得する
 *
 * @param {number} address - registerBinGet Registertableの2進数の値を取得する
 * @returns {number} -  2進数を返す
 */
function registerBinGet(address){
    if(address >= 0 && address <= 7){
        address += 3;
    }else if(address == 8||address == 9){
        address -= 7;
    }
    let table = document.getElementById('Registertable');
    var v = table.rows[ address ].cells[ 4 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
}

/**
 * memoryHexSet Memorytableの16進数の値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memoryHexSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 2 ].firstChild.data = toHex(value);
}

/**
 * memoryUdecSet Memorytableの符号なし10進数の値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memoryUdecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 3 ].firstChild.data = toUdecOver(value);
}

/**
 * memorySdecSet Memorytableの符号あり10進数の値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memorySdecSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 4 ].firstChild.data = toSdecOver(value);
}


/**
 * memoryBinSet Memorytableの2進数の値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memoryBinSet(address,value){
    let table = document.getElementById('Memorytable');
    table.rows[ address ].cells[ 5 ].firstChild.data = toBin(value);
    
}

/**
 * memoryLiteralSet MemorytableのLiteralの値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memoryLiteralSet(address,value){
    let table = document.getElementById('Memorytable');
    if(address >= 0 && address < memoryTableMaxRow){
        table.rows[ address ].cells[ 6 ].firstChild.data = value;
    }
}


/**
 * memoryScrollset Memorytableの要素位置にスクロールを設定する
 *
 * @param {number} address - 設定したいスクロールの位置をアドレスとして
 */
function memoryScrollset(address){
    let table = document.getElementById('Memorytable');
    let memory_Area = document.getElementById('memory_area');
    let offset = parseInt($("#memory_area").height()/$("#Memorytable tr").height()/2,10);
    if(address-offset >=0){
        address-=offset;
    }else{
        address=0;
    }
    let position = table.rows[address].offsetTop;
    $(memory_Area).scrollTop(position);
}


/**
 * memoryAllSet Memorytableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに入れたい値
 */
function memoryAllSet(address,value){
    if(address >= 0 && address < memoryTableMaxRow){
        memoryHexSet(address,value);
        memoryUdecSet(address,value);
        memorySdecSet(address,value);
        memoryBinSet(address,value);
        memoryLabelLiteralSet(address,value);
    }else{
        errorModal("メモリの最大数"+memoryTableMaxRow+"を超えました");
    }
    
}

/**
 * memoryLabelSet Memorytableのラベルを書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {string} value - メモリに設定したいリテラル
 */
function memoryLabelLiteralSet(address,value){
    let table = document.getElementById('Memorytable');
    if($.isNumeric(table.rows[ address ].cells[ 1 ].firstChild.data) || table.rows[ address ].cells[ 1 ].firstChild.data[0] == '"'){
        if(hexToWord(value)==""){
            table.rows[ address ].cells[ 1 ].firstChild.data = parseInt(address);
        }else{
            table.rows[ address ].cells[ 1 ].firstChild.data = '"'+hexToWord(value)+'"';
        }
    }
}

/**
 * memoryLabelSet Memorytableのラベルを書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {string} value - メモリに設定したいラベル
 */
function memoryLabelSet(address,value){
    let table = document.getElementById('Memorytable');
    if($.isNumeric(value)){
        table.rows[ address ].cells[ 1 ].firstChild.data = value;
    }else{
        table.rows[ address ].cells[ 1 ].firstChild.data = value+":";
    }
}

/**
 * memoryLineSet Memorytableのラインを書き換える
 *
 * @param {number} address - 値を入れたいメモリのアドレス
 * @param {number} value - メモリに設定したい値
 */
function memoryLineSet(address,value){
    let table = document.getElementById('Memorytable');
    if(address >= 0 && address < memoryTableMaxRow){
        table.rows[ address ].cells[ 7 ].firstChild.data = value;
    }
}

/**
 * memoryLabelGet Memorytableのラベルを取得
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {string} - ラベルの値
 */
function memoryLabelGet(address){
    let table = document.getElementById('Memorytable');
    return table.rows[ address ].cells[ 1 ].firstChild.data;
}

/**
 * memoryHexGet Memorytableの16進数の値を取得する
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {string} - 16進数を返す
 */
function memoryHexGet(address){
    let table = document.getElementById('Memorytable');
    return table.rows[ address ].cells[ 2 ].firstChild.data;
}


/**
 * memoryUdecGet Memorytableの符号なし10進数の値を取得する
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {number} - 符号なし10進数を返す
 */
function memoryUdecGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}


/**
 * memorySdecGet Memorytableの符号あり10進数の値を取得する
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {number} - 符号あり10進数を返す
 */
function memorySdecGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 4 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

/**
 * memoryBinGet Memorytableの2進数の値を取得する
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {number} - 2進数を返す
 */
function memoryBinGet(address){
    let table = document.getElementById('Memorytable');
    var v = table.rows[ address ].cells[ 5 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
}

/**
 * memoryLiteralGet MemorytableのLiteralの値を取得
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {string} - リテラルを文字列として返す
 */
function memoryLiteralGet(address){
    let table = document.getElementById('Memorytable');
    return table.rows[ address ].cells[ 6 ].firstChild.data
}

/**
 * memoryLineGet Memorytableのラインを取得
 *
 * @param {number} address - 値を取得したいメモリのアドレス
 * @returns {number} - ラインの値を返す
 */
function memoryLineGet(address){
    let table = document.getElementById('Memorytable');
    return parseInt( table.rows[ address ].cells[ 7 ].firstChild.data);
}


/**
 * toOverflowFlagSet Overflow Flagを設定する
 *
 * @param {number} value - フラグの値を決定する値
 */
function overflowFlagSet(value){
    let table = document.getElementById('Flagtable');
    if(value == 0){
        table.rows[ 1 ].cells[ 4 ].firstChild.data = 0;
        table.rows[ 1 ].cells[ 1 ].firstChild.data = '〇';
    }else{
        table.rows[ 1 ].cells[ 4 ].firstChild.data = 1;
        table.rows[ 1 ].cells[ 1 ].firstChild.data = '☆';
    }
}

// ofSdecFlagSet Overflow FlagをSdecの数字の範囲を判定して設定する
// 引数 
// value        :  値
/**
 *
 *
 * @param {*} value
 */
function ofSdecFlagSet(value){
    if(value <= 32767 && value >= -32768){
        overflowFlagSet(0);
    }else{
        overflowFlagSet(1);
    }
}

// ofUdecFlagSet Overflow FlagをUdecの数字の範囲を判定して設定する
// 引数 
// value        :  値
function ofUdecFlagSet(value){
    if(value <= 65535 && value >= 0){
        overflowFlagSet(0);
    }else{
        overflowFlagSet(1);
    }
}

// toOverflowFlagGet RegistertableのOverflow Flagの値を取得する
// 戻り値
// string   :  値
function overflowFlagGet(){
    let table = document.getElementById('Flagtable');
    var v = table.rows[ 1 ].cells[ 4 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// SignFlagSet Sign Flagを設定する
// 引数 
// v        :  値
function signFlagSet(value){
    let table = document.getElementById('Flagtable');
    value = value & 0x8000;
    if(value == 0){
        table.rows[ 1 ].cells[ 5 ].firstChild.data = 0;
        table.rows[ 1 ].cells[ 2 ].firstChild.data = '正';
    }else{
        table.rows[ 1 ].cells[ 5 ].firstChild.data = 1;
        table.rows[ 1 ].cells[ 2 ].firstChild.data = '負';
    }
}

// toSignFlagGet RegistertableのSign Flagの値を取得する
// 戻り値
// string   :  値
function signFlagGet(){
    let table = document.getElementById('Flagtable');
    var v = table.rows[ 1 ].cells[ 5 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// toZeroFlagSet Zero Flagを設定する
// 引数 
// v        :  値
function zeroFlagSet(value){
    let table = document.getElementById('Flagtable');
    //alert(value);
    if(value){
        table.rows[ 1 ].cells[ 6 ].firstChild.data = 0;
        table.rows[ 1 ].cells[ 3 ].firstChild.data = 'NonZ';
    }else{
        table.rows[ 1 ].cells[ 6 ].firstChild.data = 1;
        table.rows[ 1 ].cells[ 3 ].firstChild.data = 'Zero';
    }
}

// toZeroFlagGet RegistertableのZero Flagの値を取得する
// 戻り値
// string   :  値
function zeroFlagGet(){
    let table = document.getElementById('Flagtable');
    var v = table.rows[ 1 ].cells[ 6 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackHexSet Stacktableの16進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackHexSet(address,value){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    table.rows[ r_end-address ].cells[ 1 ].firstChild.data = toHex(value);
}

// stackUdecSet Stacktableの符号なし10進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackUdecSet(address,value){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    table.rows[ r_end-address ].cells[ 2 ].firstChild.data = toUdecOver(value);
}

// stackSdecSet Stacktableの符号あり10進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackSdecSet(address,value){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    table.rows[ r_end-address ].cells[ 3 ].firstChild.data = toSdecOver(value);
}

// stackSdecSet Stacktableの2進数の値を書き換える
// 引数 
// address  :  Stacktableの番地
// value    :  値
function stackBinSet(address,value){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    table.rows[ r_end-address ].cells[ 4 ].firstChild.data = toBin(value);
}

// stackScrollset Stacktableの要素位置にスクロールを設定する
// 引数 
// address  :  stacktableの番地
function stackScrollset(address){
    let table = document.getElementById('Stacktable');
    let stack_Area = document.getElementById('stack_area');
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let position = table.rows[r_end-address].offsetTop;
    $(stack_Area).scrollTop(position);
    
}

// stackAllSet Stacktableの2進数、符号なし10進数、符号あり10進数、16進数の値を書き換える
// 引数 
// address  :  Memorytableの番地
// value    :  値
function stackAllSet(address,value){
    stackHexSet(address,value);
    stackUdecSet(address,value);
    stackSdecSet(address,value);
    stackBinSet(address,value);
}

// stackHexGet Stacktableの16進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackHexGet(address){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    var v = table.rows[ r_end-address ].cells[ 1 ].firstChild.data;
    v = parseInt(v.replace('#',''), 16);
    return v
}

// stackUdecGet Stacktableの符号なし10進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackUdecGet(address){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    var v = table.rows[ r_end-address ].cells[ 2 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackUdecGet Stacktableの符号あり10進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackSdecGet(address){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    var v = table.rows[ r_end-address ].cells[ 3 ].firstChild.data;
    v = parseInt(v, 10);
    return v
}

// stackBinGet stacktableの2進数の値を取得する
// 引数 
// address  :  Stacktableの番地
// 戻り値
// string   :  値
function stackBinGet(address){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    var v = table.rows[ r_end-address ].cells[ 4 ].firstChild.data;
    v = parseInt(v.replace(/ /g,''), 2);
    return v
}

// ajaxJsonToMemoryMap memorytableにバイナリを読み込む
// 引数 
// obj  :  data type:json
function ajaxJsonToMemoryMap(obj){
    
    if(obj["result"]==undefined){
        alert("Result is undefined");
    }else if(obj["result"]=="OK"){
        let address= 0;
        let jsonparse = JSON.parse(obj["code"]);
        let message = "";

        jsonparse.forEach(element => {
            memoryAllSet(address,element.Code);
            memoryLiteralSet(address,element.Token.Literal);
            memoryLineSet(address,element.Token.Line);
            if(element.Label != undefined){
                memoryLabelSet(address,element.Label.Label);
            }
            if(element.Token.Literal=="DC"){
                memoryAllSet(address,element.Addr); 
            }
            if(element.Length == 2){
                memoryAllSet(address+1,element.Addr); 
            }
            address += element.Length;
        });
        successModal("アセンブル成功");
        setEnableCaslButton(false);
        if(obj["warning"]){
            let jsonparsewarning = JSON.parse(obj["warning"]);
            jsonparsewarning.forEach(element => {
            selectLine(parseInt(element.Line));
            message = element.Line+"行目</br>"+element.Message+" <br> ";
            warModal(message);
            });    
        }
    }else{
        let jsonparseerror = JSON.parse(obj["error"]);
        jsonparseerror.forEach(element => {
            message = element.Line+"行目</br>"+element.Message+" <br> ";
            errorModal(message);
            selectLine(parseInt(element.Line));
        });
        setEnableCaslButton(true);
    }
}

// memoryTableRowColorSet Memorytableの行の色を変更する
// 引数 
// address  :  Memorytableの番地
// color    :  値
function memoryTableRowColorSet(address,color){
    //removeClass
    let table = $("#Memorytable tr");
    //let table = document.getElementById('Memorytable');
    //table.rows[address].style.backgroundColor=color;
    $(table[address]).removeClass();
    $(table[address]).addClass("table-"+color);
    //console.log();
}

// registerTableRowColorSet Registertableの行の色を変更する
// 引数 
// address  :  Registertableの番地
// color    :  値
function registerTableRowColorSet(address,color){
    let table = document.getElementById('Registertable');
    if(address >= 0 && address <= 7){
        table.rows[address+3].style.backgroundColor=color;
    }else if(address == 8||address == 9){
        table.rows[address-7].style.backgroundColor=color;
    }
}

// stackTableRowColorSet Stacktableの行の色を変更する
// 引数 
// address  :  Stacktableの番地
// color    :  値
function stackTableRowColorSet(address,color){
    address = 0xFFFF-address;
    let r_end = stackTableMaxRow;
    let table = document.getElementById('Stacktable');
    table.rows[r_end-address].style.backgroundColor=color;
}

// initMemoryRegister 全てのテーブルの値、色、スクロールのリセット
function initMemoryRegister(){
    //Memory PR Color Reset
    memoryTableRowColorSet(prUdecGet(),"light");
    for(var i = 0 ; i < memoryTableMaxRow ; i++){
        memoryLabelSet(i,i);
        memoryAllSet(i,0);
        memoryLiteralSet(i,"");
    }
    for(i = 0 ; i < stackTableMaxRow ; i++){
        stackAllSet(0xFFFF-i,0);
        stackTableRowColorSet(0xFFFF-i,"#FFFFFF");
    }
    for(i = 0 ; i < 10 ; i++){
        registerAllSet(i,0);
        registerTableRowColorSet(i,"#FFFFFF");
    }
    memoryScrollset(0);
   
    stackScrollset(0xFFFF);
    registerAllSet(9,65535);
    registerTableRowColorSet(8,"#00BCD4");
    registerTableRowColorSet(9,"#EEBCD4");
    zeroFlagSet(1);
    signFlagSet(0);
    ofSdecFlagSet(0);
    ofSdecFlagSet(0);
    cometExecuteStop();
    StepBackControler = new StepBackControl();
}

// errorModal Modalを利用してアラートの表示
// 引数 
// message    :  値
function errorModal(message){
    if(Math.random()*100%100<1){
        message=message+'<img src="losecat.jpg"  alt="losecat" class="img-fluid">';
    }
    $('#errorModal').on('shown.bs.modal',function(){
        $('#okButton').trigger('focus');
        
    })
    $('#errorModal').find('.modal-title').text("Error");
    $('#errorModal').find('.modal-body').html(message);
    $('#errorModal').modal('show');
}

// successModal Modalを利用してアラートの表示
// 引数 
// message    :  値
function successModal(message){
    if(Math.random()*100%100<1){
        message=message+'<img src="successcat.jpg"  alt="successcat" class="img-fluid">';
    }
    $('#successModal').on('shown.bs.modal',function(){
        $('#okButton2').trigger('focus');
    })
    $('#successModal').find('.modal-title').text("Success");
    $('#successModal').find('.modal-body').html(message);
    $('#successModal').modal('show');
}

// infoModal Modalを利用してアラートの表示
// 引数 
// message    :  値
function infoModal(message){
    $('#infoModal').on('shown.bs.modal',function(){
        $('#okButton3').trigger('focus');
    })
    $('#infoModal').find('.modal-title').text("Information");
    $('#infoModal').find('.modal-body').text((message));
    $('#infoModal').modal('show');
}

// warModal Modalを利用してアラートの表示
// 引数 
// message    :  値
function warModal(message){
    $('#warModal').on('shown.bs.modal',function(){
        $('#okButton4').trigger('focus');
    })
    $('#warModal').find('.modal-title').text("Warning");
    $('#warModal').find('.modal-body').html((message));
    $('#warModal').modal('show');
}

