var socket = new WebSocket("ws://10.11.35.117:8092");

socket.onmessage = function(event) {
  chessGame.clearCanvas();
  // 绘制棋盘
  chessGame.drawChessBoard();
  chessGame.setChessList(JSON.parse(event.data));
  // 重新绘制棋子
  chessGame.getChessList().forEach(chessGame.drawChess)
}

socket.onopen = function() {
  window.addEventListener('updateChessList', function(event) {
    socket.send(JSON.stringify(event.detail));
  });
}