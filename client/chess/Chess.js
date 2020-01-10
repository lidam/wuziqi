class Chess {
  constructor(canvas, unitWidth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.unitWidth = unitWidth;
  }
  // 设置棋盘
  _setChessBoard() {
    this.canvas.width = this.unitWidth*(this.lineNum + 1);
    this.canvas.height = this.canvas.width;
  }
  getUnitWidth() {
    return this.unitWidth;
  }
  // 画棋盘
  drawChessBoard() {
    // 设置棋盘大小
    this._setChessBoard();
    // 绘制棋盘
    for(let i=1;i<this.lineNum+1;i++){
      // 横线
      this.ctx.beginPath();
      this.ctx.moveTo(this.unitWidth, i*this.unitWidth);
      this.ctx.lineTo(this.unitWidth*this.lineNum, i*this.unitWidth);
      this.ctx.stroke();
      // 纵线
      this.ctx.beginPath();
      this.ctx.moveTo(i*this.unitWidth, this.unitWidth);
      this.ctx.lineTo(i*this.unitWidth, this.unitWidth*this.lineNum);
      this.ctx.stroke();
    }
  }
  // 画棋子
  drawChess(chessInfo) {
    this.ctx.beginPath();
    this.ctx.arc(chessInfo.x, chessInfo.y, 10, 0, Math.PI*2, true);
    this.ctx.fillStyle = chessInfo.color;
    this.ctx.fill();
  }
  // 是否越界
  _isCrossTheBorder(e) {
    const x = e.clientX;
    const y = e.clientY;
    if(x <= this.unitWidth/2 ||
       x >= this.unitWidth*this.lineNum + this.unitWidth/2 ||
       y <= this.unitWidth/2 ||
       y >= this.unitWidth*this.lineNum + this.unitWidth/2){
      return true;
    }
    return false;
  }
  // 是否是重复的位置
  _isRepeatPosition(chessInfo, list) {
    const repeatList = list.filter(item => {
      return item.x === chessInfo.x && item.y === chessInfo.y;
    })
    return repeatList.length > 0
  }
  // 是否是有效的位置
  isValidChessPosition(e, chess, list) {
    if(this._isCrossTheBorder(e)){
      return false;
    }
    if(this._isRepeatPosition(chess, list)){
      return false;
    }
    return true;
  }
  // 清空棋盘
  clearChessBoard() {
    this.ctx.clearRect(this.unitWidth/2, this.unitWidth/2, this.unitWidth*this.lineNum + this.unitWidth/2, this.unitWidth*this.lineNum + this.unitWidth/2);
  }
  // 检查是否赢棋
  checkWin() {
    throw new Error('请写具体实现');
  }
}
// 五子棋
class Wuziqi extends Chess {
  constructor(ctx, unitWidth) {
    super(ctx, unitWidth);
    this.lineNum = 15;
    this.blackNum = 113;
    this.whiteNum = 112;
  }
  // 判断输赢
  checkWin(chessInfo, list) {
    let winCaseList = []
    for(let k=0;k<4;k++){
      winCaseList[k] = winCaseList[k] || [];
      for(let i=0;i<5;i++){
        winCaseList[k][i] = winCaseList[k][i] || [];
        for(let j=-i;j<5-i;j++){
          // 横着
          if(k === 0){
            winCaseList[k][i].push({
              x: chessInfo.x - j * this.unitWidth,
              y: chessInfo.y,
              color: chessInfo.color
            });
          }
          // 竖
          if(k === 1){
            winCaseList[k][i].push({
              x: chessInfo.x,
              y: chessInfo.y - j * this.unitWidth,
              color: chessInfo.color
            });
          }
          // 右斜
          if(k === 2){
            winCaseList[k][i].push({
              x: chessInfo.x - j * this.unitWidth,
              y: chessInfo.y + j * this.unitWidth,
              color: chessInfo.color
            });
          }
          // 左斜
          if(k === 3){
            winCaseList[k][i].push({
              x: chessInfo.x - j * this.unitWidth,
              y: chessInfo.y - j * this.unitWidth,
              color: chessInfo.color
            });
          }
        }
      }
    }
    const thisColorList = list.filter(item => item.color === chessInfo.color);
    var flag = winCaseList.some(items => {
      return items.some(winList => {
        return winList.every(item => {
          return thisColorList.filter(chess => {
            return item.x===chess.x && item.y===chess.y && item.color===chess.color
          }).length > 0
        })
      })
    });
    return flag;
  }
}
// 四子棋
class Siziqi extends Chess {
  constructor(ctx, unitWidth) {
    super(ctx, unitWidth);
    this.lineNum = 9;
    this.blackNum = 41;
    this.whiteNum = 40;
  }
  // 判断输赢
  checkWin(chessInfo, list) {
    alert('正在努力建设中。。。')
  }
}
// 围棋
class Weiqi extends Chess {
  constructor(ctx, unitWidth) {
    super(ctx, unitWidth);
    this.lineNum = 19;
    this.blackNum = 181;
    this.whiteNum = 180;
  }
  // 判断输赢
  checkWin(chessInfo, list) {
    alert('正在努力建设中。。。')
  }
}