//球顏色
var buttonColors = ["red", "blue", "green", "yellow"];
//解答陣列
var gamePattern = [];
//玩家選過的顏色陣列
var userClickedPattern = [];
//開始變數
var started = false;
//開始等級
var level = 0;
//任意鍵
// change h1 tag to the level title.123
$(document).keypress(function() {
//如果還沒開始的啟動程式
  if (!started) {
    //改LEVELABLE
    $("#level-title").text("Level" + level);
    //迎接下關
    nextSequence();
    //宣告開始
    started = true;
  }
});
//四個按鈕案到其中一個
$(".btn").click(function() {
//偵測按下的按鈕
  var userChosenColor = $(this).attr("id");
  //加到玩家選過的顏色陣列
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor + "userChosenColor");
  //撥放效果音
  playSound(userChosenColor);
  //按鈕動畫
  animatePress(userChosenColor);

  //把剛回答的球號的長度減一丟到回答球號函數
  checkAnswer(userClickedPattern.length-1);

});
//回答球號函數
function checkAnswer(currentLevel) {

  //判斷有沒有選對，正解===選的球
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console輸出正確
    console.log("success");

    //確定累績答案數量跟回答過的數量一致
    if (userClickedPattern.length === gamePattern.length) {
      //延遲一下
      setTimeout(function() {
        //迎接下關
        nextSequence();
      }, 1000);

  }
} else {
  //console輸出錯誤
  console.log("wrong");
  //撥放效果音
  playSound("wrong");
  //遊戲失敗特效啟動
  $("body").addClass("game-over");
  //遊戲失敗特效復位
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  //失敗標題
  $("#level-title").text("Game Over, Press Any Key to Restart");
  //失敗歸零
  startOver();

}
}
//隨機顏色並顯示
function nextSequence() {
//清空userClickedPattern用來迎接下一關
  // userClickedPattern = [];
  //更新等級
  level++;
  //標題顯示等級
  $("#level-title").text("Level" +level);
  //隨機球號
  var randomNumber = Math.floor(Math.random() * 4);
  //根據隨機數選色
  var randomChosenColor = buttonColors[randomNumber];
  //把選好的色放到解答陣列
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor + "randomChosenColor");
  //被選的顏色淡入淡出效果
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //被選的顏色撥放聲音
  playSound(randomChosenColor);
}
//撥放效果音
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//按鈕被按下的動畫，透過加類別，與事先設定好的CSS完成
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout (function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
//失敗
function startOver() {

  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

}
