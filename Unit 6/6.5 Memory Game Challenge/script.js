const gameContainer = document.getElementById('game');

const colors = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

// TODO: Implement this function!

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'card');
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function currentScoreCounter() {
  let currentScore = Number(localStorage.getItem('gameScore'));
  const currentScoreNumDiv = document.getElementById('currentScoreNum');

  currentScore += 1;
  currentScoreNumDiv.innerHTML = currentScore;

  localStorage.setItem('gameScore', currentScore);
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const cardClicked = event.target;
  if (cardClicked) {
    console.log('you just clicked', cardClicked);
    currentScoreCounter();
  }
}

function compareCurrentAndBestScoreToLocalStorage() {
  const currentScore = currentScoreCounter();
  const bestScoreInLocalStorage = { bestScore: bestScore };
  if (currentScore < bestScoreInLocalStorage) {
    bestScoreInLocalStorage = currentScore;
    localStorage.setItem(bestScore, JSON.stringify(bestScoreInLocalStorage));
  }
}

function addBestScoreToLocalStorage() {
  const bestScore = compareCurrentAndBestScoreToLocalStorage();
  localStorage.removeItem('bestScore');
  localStorage.setItem('bestScore', bestScore);
}

function loadBestScoreFromLocalStorage() {
  const bestScoreInLocalStorage = localStorage.getItem('bestScore');
  if (bestScoreInLocalStorage) {
    const bestScoreNumDiv = document.getElementById('bestScoreNum');
    bestScoreNumDiv.innerHTML = bestScoreInLocalStorage;
  }
}

// when the DOM loads
function loadPage() {
  createDivsForColors(shuffledColors);
  loadBestScoreFromLocalStorage();
  localStorage.setItem('gameScore', 0);
}

/*
if score when game ends is < best score, make score best score and store in local storage
on click add class
if card doesn't equal card, remove class otherwise keep class and don't allow second click
*/
