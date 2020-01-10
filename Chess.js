let Chess = function(){
  var chessWidth = 20;
  var compareList = [];
  const checkWinProcessor = {
    wuziqi(chessInfo) {
      return chessWuziqi(chessInfo);
    }
  }
  // 判断输赢规则代理，如果当前没有该类棋的判断规则，则友好地回复客户
  let checkWinProxy = new Proxy(checkWinProcessor, {
    get: function(obj, prop) {
      return prop in obj ? obj[prop] : obj[prop] = function(){
        console.log('你想玩这种棋吗？提供给我规则，我来帮你实现~~');
      }
    }
  })
  // 五子棋-判断输赢
  function chessWuziqi(chessInfo) {
    let winCaseList = []
    for(let k=0;k<4;k++){
      winCaseList[k] = winCaseList[k] || [];
      for(let i=0;i<5;i++){
        winCaseList[k][i] = winCaseList[k][i] || [];
        for(let j=-i;j<5-i;j++){
          // 横着
          if(k === 0){
            winCaseList[k][i].push({
              x: chessInfo.x - j * chessWidth,
              y: chessInfo.y,
              color: chessInfo.color
            });
          }
          // 竖
          if(k === 1){
            winCaseList[k][i].push({
              x: chessInfo.x,
              y: chessInfo.y - j * chessWidth,
              color: chessInfo.color
            });
          }
          // 右斜
          if(k === 2){
            winCaseList[k][i].push({
              x: chessInfo.x - j * chessWidth,
              y: chessInfo.y + j * chessWidth,
              color: chessInfo.color
            });
          }
          // 左斜
          if(k === 3){
            winCaseList[k][i].push({
              x: chessInfo.x - j * chessWidth,
              y: chessInfo.y - j * chessWidth,
              color: chessInfo.color
            });
          }
        }
      }
    }
    const thisColorList = compareList.filter(item => item.color === chessInfo.color);
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
  // 判断输赢函数
  function checkWin(data) {
    const {type, chessInfo, chessUnitWidth, list} = data
    chessWidth = chessUnitWidth;
    compareList = list;
    return checkWinProxy[type](chessInfo);
  }
  return {
    checkWin: checkWin
  }
}();