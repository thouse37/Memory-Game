// Press any key to Start
// h1 to Level 1
// a box flashes with noise when clicked.
// add the animation to the pattern
// when correct box selected move H1 to level 2.
// Wait a delayed amount of time, then add another animation to pattern.
// if failure to select correct button, h1 = "Game Over, Press Any Key to Restart"
// failure noise, html background color toggles red

var solution = [];
var tester = [];
var level = 1;
var gameStarted = false;
var gameLost = false;

// start a level
function startLevel() {
  $("h1").text("Level " + level);
  var buttons = $(".btn");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = $(buttons[randomNumber]);
  randomButton.toggleClass("pressed");
  var buttonID = randomButton.attr("id");
  audio(buttonID);
  setTimeout(function () {
    randomButton.toggleClass("pressed");
    solutionSequence(buttonID);
  }, 200);
}

// solutionSequence - main sequence to test against.
function solutionSequence(buttonID) {
  solution.push(buttonID);
  console.log(solution);
}

// function for button clicks to solve level
$(".btn").on("click", function () {
  var buttonClicked = $(this);
  buttonClicked.toggleClass("pressed");
  var buttonID = this.id;
  audio(buttonID);
  setTimeout(function () {
    buttonClicked.toggleClass("pressed");
    testSequence(buttonID);
  }, 200);
});

// testSequence - button ID is added when clicked to test against solution.
function testSequence(buttonID) {
  tester.push(buttonID);
  console.log(tester);
  if (compareSequences()) {
    if (tester.length === solution.length) {
      level++;
      tester = [];
      setTimeout(function () {
        startLevel();
      }, 200);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    wrongAudio();
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 100);
    gameLost = true;
  }
}

// compare the tester and solution sequences
function compareSequences() {
  var minLength = Math.min(tester.length, solution.length);
  for (var i = 0; i < minLength; i++) {
    if (tester[i] !== solution[i]) {
      return false;
    }
  }
  return true;
}

// Start the game when a key is pressed
$(document).on("keydown", function () {
  if (!gameStarted) {
    gameStarted = true;
    solution = [];
    tester = [];
    level = 1;
    startLevel();
  }
});

// Retart game
$(document).on("keydown", function () {
  if (gameLost) {
    gameLost = false;
    solution = [];
    tester = [];
    level = 1;
    setTimeout(function () {
      startLevel();
    }, 200);
  }
});

// function to play audio.
function audio(buttonID) {
  switch (buttonID) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    default:
      console.log(buttonID);
  }
}

function wrongAudio() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
}
