//const fs = require('fs');
//const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let footerArea = null;


let currentPath = '';
var editor = null;

window.addEventListener('DOMContentLoaded', onLoad);

/**
 * Webページ読み込み時の処理
 */
function onLoad() {
  // 入力関連領域
  inputArea = document.getElementById('input_area');
  // 入力領域
  inputTxt = document.getElementById('input_txt');
  // フッター領域
  footerArea = document.getElementById('footer_fixed');
  var langTools = ace.require("ace/ext/language_tools");
  var staticWordCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
        if (prefix.length === 0) { callback(null, []); return }
        var wordList = [
          ["LD"," GR , GR"," LD GR , GR"],["LD ","GR , Addr","LD GR , Addr"],["LAD ","GR , Addr","LAD GR , Addr"],["ST"," GR , Addr"," GR,Addr [,x]"],["ADDA"," GR , GR"," ADDA GR , GR"],["ADDA ","GR , Addr","ADDA GR , Addr [,x]"],
          ["ADDL"," GR , GR"," ADDL GR , GR"],["ADDL ","GR , Addr","ADDL GR , Addr [,x]"],["SUBA"," GR , Addr"," SUBA GR,Addr [,x]"],["SUBA"," GR , Addr","SUBA GR,Addr [,x]"],["SUBL"," GR , Addr"," SUBL GR,Addr [,x]"],["SUBL"," GR , Addr","SUBL GR,Addr [,x]"],
          ["AND"," GR , GR"," AND GR , GR"],["AND "," GR , Addr","AND GR,Addr [,x]"],["OR"," GR , GR"," OR GR , GR"],["OR "," GR , Addr","OR GR,Addr [,x]"],
          ["XOR"," GR , GR"," XOR GR , GR"],["XOR "," GR , Addr","XOR GR,Addr [,x]"],
          ["CPA"," GR , GR"," CPA GR , GR"],["CPA "," GR , Addr","CPA GR,Addr [,x]"],
          ["CPL"," GR , GR"," CPA GR , GR"],["CPL "," GR , Addr","CPL GR,Addr [,x]"],
          ["SLA"," GR , Addr"," SLA GR , Addr [,x]"],["SRA"," GR , Addr"," SRA GR , Addr [,x]"],
          ["SLL"," GR , Addr"," SLL GR , Addr [,x]"],["SRL"," GR , Addr"," SRL GR , Addr [,x]"],
          ["JPL"," Addr"," JPL Addr [,x]"],["JMI"," Addr"," JMI Addr [,x]"],
          ["JNZ"," Addr"," JNZ Addr [,x]"],["JZE"," Addr"," JZE Addr [,x]"],
          ["JUMP"," Addr"," JUMP Addr [,x]"],["PUSH"," Addr"," PUSH Addr [,x]"],
          ["POP"," GR"," POP GR"],
          ["GR1","","Register"],["GR2","","Register"],["GR3","","Register"],["GR4","","Register"],["GR5","","Register"],["GR6","","Register"],["GR7","","Register"],
        ];
        var autoWord = [];
        for(var i=0;i<wordList.length;i++){
          if(prefix.slice(0,prefix.length)==wordList[i][0].slice(0,prefix.length)){
            autoWord.push(wordList[i]);
          }
        }
        callback(null, autoWord.map(function(word) {
            return {
                caption: word[0],
                value: word[0]+word[1],
                meta: word[2],
            };
          
        }));

    }
}
  
  editor = ace.edit('input_txt');
  //editor.getSession().setMode('ace/mode/javascript');

  langTools.setCompleters([staticWordCompleter,langTools.textCompleter])
  //langTools.setCompleters([staticWordCompleter]);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });
  editor.session.setMode("ace/mode/casl2");
  var val = localStorage["caslcode"];

  let sessionparse = null;
  try{
    if(val){
      sessionparse = JSON.parse(val);
      editor.setSession(sessionFromJSON(sessionparse));
    }
  }catch(e){
    errorModal(e);
    window.localStorage.clear();
  }
  if(sessionparse!=null){
    editor.setSession(sessionFromJSON(sessionparse));
  }
  editor.on("change",function(e){
    localStorage["caslcode"] = JSON.stringify(sessionToJSON(editor.session));
    setEnableCaslButton(true);
  })

  // ドラッグ&ドロップ関連処理
  // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
  document.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  document.addEventListener('drop', (event) => {
    event.preventDefault();
  });

  // 入力部分の処理
  inputArea.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('dragleave', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('dragend', (event) => {
    event.preventDefault();
  });
  inputArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    readFile(file.path);
  });

  // 「読み込む」ボタンの制御
  document.querySelector('#btnLoad').addEventListener('click', () => {
    //openLoadFile();
    btnStepExecution.disabled = true;
  });
  // 「保存する」ボタンの制御
  document.querySelector('#btnSave').addEventListener('click', () => {
    //openLoadFile();
    var content = editor.getValue();
    var blob = new Blob([ content ], { "type" : "text/plain" });
    if (window.navigator.msSaveBlob) { 
      window.navigator.msSaveBlob(blob, "code.txt"); 
      // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
      window.navigator.msSaveOrOpenBlob(blob, "code.txt"); 
    } else {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.target = '_blank';
      a.download = 'code.txt';
      a.click();                
    }
  });
};

//行を選択します

function selectLine(value){
  editor.selection.moveCursorToPosition({row:value-1,column:0});
  editor.selection.selectLine();
}


/**
 * ファイルを開きます。
 */
function openLoadFile() {
  const win = BrowserWindow.getFocusedWindow();

  dialog.showOpenDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'Documents',
          extensions: ['txt', 'text', 'html', 'js']
        }
      ]
    },
    // [ファイル選択]ダイアログが閉じられた後のコールバック関数
    (fileNames) => {
      if (fileNames) {
        readFile(fileNames[0]);
      }
    });
}

/**
 * テキストを読み込み、テキストを入力エリアに設定します。
 */
function readFile(path) {
  currentPath = path;
  fs.readFile(path, (error, text) => {
    if (error != null) {
      alert('error : ' + error);
      return;
    }
    // フッター部分に読み込み先のパスを設定する
    footerArea.innerHTML = path;
    // テキスト入力エリアに設定する
    editor.setValue(text.toString(), -1);
  });
}

/**
 * ファイルを保存します。
 */
function saveFile() {

  //　初期の入力エリアに設定されたテキストを保存しようとしたときは新規ファイルを作成する
  if (currentPath === '') {
    saveNewFile();
    return;
  }

  const win = BrowserWindow.getFocusedWindow();

  dialog.showMessageBox(win, {
      title: 'ファイルの上書き保存を行います。',
      type: 'info',
      buttons: ['OK', 'Cancel'],
      detail: '本当に保存しますか？'
    },
    // メッセージボックスが閉じられた後のコールバック関数
    (response) => {
      // OKボタン(ボタン配列の0番目がOK)
      if (response === 0) {
        const data = editor.getValue();
        writeFile(currentPath, data);
      }
    }
  );
}

/**
 * ファイルを書き込みます。
 */
function writeFile(path, data) {
  fs.writeFile(path, data, (error) => {
    if (error != null) {
      alert('error : ' + error);
    }
  });
}

/**
 * 新規ファイルを保存します。
 */
function saveNewFile() {

  const win = BrowserWindow.getFocusedWindow();
  dialog.showSaveDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'Documents',
          extensions: ['txt', 'text', 'html', 'js']
        }
      ]
    },
    // セーブ用ダイアログが閉じられた後のコールバック関数
    (fileName) => {
      if (fileName) {
        const data = editor.getValue();
        currentPath = fileName;
        writeFile(currentPath, data);
      }
    }
  );
}
var filterHistory = function(deltas){ 
  return deltas.filter(function (d) {
      return d.group != "fold";
  });
}

sessionToJSON = function(session) {
  return {
      selection: session.selection.toJSON(),
      value: session.getValue(),
      history: {
          undo: session.$undoManager.$undoStack.map(filterHistory),
          redo: session.$undoManager.$redoStack.map(filterHistory)
      },
      scrollTop: session.getScrollTop(),
      scrollLeft: session.getScrollLeft(),
      options: session.getOptions()
  }
}
sessionFromJSON = function(data) {
  var session = require("ace/ace").createEditSession(data.value);
  session.$undoManager.$doc = session; // workaround for a bug in ace
  session.setOptions(data.options);
  session.$undoManager.$undoStack = data.history.undo;
  session.$undoManager.$redoStack = data.history.redo;
  session.selection.fromJSON(data.selection);
  session.setScrollTop(data.scrollTop);
  session.setScrollLeft(data.scrollLeft);
  return session;
};