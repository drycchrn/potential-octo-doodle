let seconds;
let timer;

function decreaseSeconds() {
  const secondsRemaining = --seconds;
  if (secondsRemaining === 0) {
    clearInterval(timer);
    console.log("DONE!");
  } else {
    console.log(secondsRemaining);
  }
}

function countdown(time) {
  seconds = time;
  timer = setInterval(decreaseSeconds, 1000);
}

countdown(2);
