var chessGame = (function() {
  var canvas = document.getElementById('tutorial');
  var button = document.getElementById('HuiQi');
  var startBtn = document.getElementById('startPlay');
  var types = document.getElementsByName('chessType');

  let list = [];
  const chessUnitWidth = 30;

  let ChessInstance = null;

  // 获取选中的类型
  function getSelectedType(types) {
    for(let i=0,j=types.length;i<j;i++){
      if(types[i].checked){
        return types[i].value
      }
    }
    return undefined;
  }
  // 生成实例
  const generateChessInstance = {
    wuziqi() {
      return new Wuziqi(canvas, chessUnitWidth);
    },
    siziqi() {
      return new Siziqi(canvas, chessUnitWidth);
    },
    weiqi() {
      return new Weiqi(canvas, chessUnitWidth);
    }
  }
  // 绑定事件
  function bindEvents() {
    startBtn.addEventListener('click', function() {
      const type = getSelectedType(types)
      ChessInstance = generateChessInstance[type]();
      ChessInstance.drawChessBoard();
    });
    // 下棋
    canvas.addEventListener('click', play); 
    // 悔棋
    button.addEventListener('click', HuiQi)
  }
  // 下棋
  function play(e) {
    const chess = {
      x: Math.round(e.clientX/ChessInstance.getUnitWidth()) * ChessInstance.getUnitWidth(),
      y: Math.round(e.clientY/ChessInstance.getUnitWidth()) * ChessInstance.getUnitWidth(),
      color: list.length % 2 === 0 ? 'black' : 'white'
    }
    if(!ChessInstance.isValidChessPosition(e, chess, list)) {
      return;
    }
    list.push(chess);
    // 棋子同步
    window.dispatchEvent(new CustomEvent('updateChessList', {detail: list}));
    // 判断是否赢了
    if(ChessInstance.checkWin(chess, list)){
      console.log('赢了');
    }
  }
  // 悔棋
  function HuiQi() {
    // 删除当前的最后一步棋
    list.pop();
    // 棋子同步
    window.dispatchEvent(new CustomEvent('updateChessList', {detail: list}));
  }
  // 画棋盘
  function drawChessBoard() {
    ChessInstance.drawChessBoard();
  }
  // 绘制棋子
  function drawChess(chess) {
    ChessInstance.drawChess(chess);
  }
  // 获取棋子
  function getChessList() {
    return list;
  }
  // 设置棋子
  function setChessList(data) {
    list = data
  }
  // 清空棋盘
  function clearCanvas() {
    ChessInstance.clearChessBoard();
  }
  bindEvents();
  return {
    drawChessBoard,
    drawChess,
    clearCanvas,
    getChessList,
    setChessList
  }
})();
