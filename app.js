var chessGame = (function() {
  var canvas = document.getElementById('tutorial');
  var button = document.getElementById('HuiQi');
  var ctx = canvas.getContext('2d');
  let list = [];
  const chessUnitWidth = 30;
  const chessUnitNum = 15;
  canvas.width = chessUnitWidth*(chessUnitNum + 1);
  canvas.height = canvas.width;

  // 画棋盘
  function drawChessBoard() {
    for(let i=1;i<chessUnitNum+1;i++){
      ctx.beginPath();
      ctx.moveTo(chessUnitWidth, i*chessUnitWidth);
      ctx.lineTo(chessUnitWidth*chessUnitNum, i*chessUnitWidth);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i*chessUnitWidth, chessUnitWidth);
      ctx.lineTo(i*chessUnitWidth, chessUnitWidth*chessUnitNum);
      ctx.stroke();
    }
  }
  // 绘制棋子
  function drawChess(chess) {
    ctx.beginPath();
    ctx.arc(chess.x, chess.y, 10, 0, Math.PI*2, true);
    ctx.fillStyle = chess.color;
    ctx.fill();
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
    // 清空棋盘
    ctx.clearRect(0, 0, canvas.width, canvas.width);
  }
  // 是否越界
  function isCrossTheBorder(e) {
    const x = e.clientX;
    const y = e.clientY;
    if(x <= chessUnitWidth/2 ||
       x >= chessUnitWidth*chessUnitNum + chessUnitWidth/2 ||
       y <= chessUnitWidth/2 ||
       y >= chessUnitWidth*chessUnitNum + chessUnitWidth/2){
      return true;
    }
    return false;
  }
  // 是否是重复的位置
  function isRepeatPosition(chessInfo) {
    const repeatList = list.filter(item => {
      return item.x === chessInfo.x && item.y === chessInfo.y;
    })
    return repeatList.length > 0
  }
  // 下棋
  function play(e) {
    if(isCrossTheBorder(e)){
      return;
    }
    const chess = {
      x: Math.round(e.clientX/chessUnitWidth) * chessUnitWidth,
      y: Math.round(e.clientY/chessUnitWidth) * chessUnitWidth,
      color: list.length % 2 === 0 ? 'black' : 'white'
    }
    if(isRepeatPosition(chess)){
      return;
    }
    list.push(chess);
    // 棋子同步
    window.dispatchEvent(new CustomEvent('updateChessList', {detail: list}));
  }
  // 悔棋
  function HuiQi() {
    // 删除当前的最后一步棋
    list.pop();
    // 棋子同步
    window.dispatchEvent(new CustomEvent('updateChessList', {detail: list}));
  }
  // 绑定事件
  function bindEvents() {
    // 下棋
    canvas.addEventListener('click', play); 
    // 悔棋
    button.addEventListener('click', HuiQi)
  }
  // 初始化
  drawChessBoard();
  bindEvents();
  return {
    drawChessBoard,
    drawChess,
    clearCanvas,
    getChessList,
    setChessList
  }
})();
