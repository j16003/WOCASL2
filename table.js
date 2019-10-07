        /*------------------------------------------------
         jQuery でプログラム的にテーブルを作成する
        --------------------------------------------------*/
        $(document).ready(function () {
            var r_end = 11;  // 行数
            var c_end = 5;  // 列数 
            memory_Area = document.getElementById('memory_area');
            var tableJQ = $('<table id="table_id1">');
            for (var r = 1; r <= r_end; r++) {
                var r000 = padLeft('0000', r);
                var trJQ_r = $('<tr></tr>').appendTo(tableJQ);
                for (var c = 1; c <= c_end; c++) {
                    var c000 = padLeft('0000', c);
                    $('<td>r=' + r000 + ':c=' + c000 + '</td>').appendTo(trJQ_r);
                }
            }
 
            $(memory_Area).append(tableJQ);
        });

        function padLeft(pad, str) {
            if (typeof str === 'undefined')
                return pad;
 
            return (pad + str).slice(-pad.length);
        }
        function padRight(pad, str) {
            if (typeof str === 'undefined')
                return pad;
 
            return (str + pad).substring(0, pad.length);
        }