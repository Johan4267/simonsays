
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;

$(document).on("keydown", function(){

  if(started === false){
    $("h1").text("Level " + level);
    started = true;
  }
  nextSeq();
});

$(".btn").on("click", function(){
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSeq(){
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);


  $("#" + randomColor).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSeq();
      },1000);
    }
  }

  else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 2000);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = 0;
  started = 0;

}

function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("." +  currentColor).addClass("pressed");
  setTimeout(function() {
    $("." +  currentColor).removeClass("pressed");
  }, 100);
}
