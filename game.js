
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;

$(document).keypress(function(){

  if(!started){
    $("h1").text("Level " + level);
    nextSeq();
    started = true;
  }
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


  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
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
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Click Button to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}

function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" +  currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" +  currentColor).removeClass("pressed");
  }, 100);
}
