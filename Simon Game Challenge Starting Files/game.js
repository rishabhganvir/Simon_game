var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
}

$(document).on("keydown", function(){
  if (!gameStart){
    gameStart = true;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(function(error) {
    console.error("Failed to play audio:", error);
  });
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout((function () {
        nextSequence()
      }),{
        }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over")
     setTimeout(function(){
      $("body").removeClass("game-over")
     }, 200);
     $("h1").text("Game Over, Press Any Key to Restart");
     startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
  $("h1").text("Press A Key to Start");
}
