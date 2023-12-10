let seconds = 0;
let timer;

function runIteration() {
  seconds++;
  var randomNumber = Math.random();
  if (randomNumber > 0.75) {
    clearInterval(timer);
    console.log("Attempts: " + seconds);
  }
}

function randomGame() {
  timer = setInterval(runIteration, 1000);
}

randomGame();
