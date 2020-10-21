var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;


$(document).keydown(function(event) {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
})

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  if (userChosenColor !== gamePattern[userClickedPattern.length - 1]) {
    gameOver();
  }
  if (userClickedPattern.length == level) {
    setTimeout(nextSequence, 1000);
  }
  playSound(userChosenColor);
  animatePress(userChosenColor);
});


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var r = Math.random();
  randomNumber = Math.floor(r * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  userClickedPattern = [];
  // console.log(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gameStarted = false;
  gamePattern = [];
  level = 0;
}
