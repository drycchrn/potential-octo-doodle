function generateRandomColorsArray() {
  //const pairInput = document.getElementById('pairInput');
  //const numOfColorsNeeded = pairInput.value;
  const numOfColorsNeeded = 5;
  const alphaAndNum = '0123456789ABCDEF';
  let color = '#';
  const randomColors = [];

  for (let i = 0; i < numOfColorsNeeded; i++) {
    for (let j = 0; j < 6; j++) {
      color += alphaAndNum[Math.floor(Math.random() * 16)];
    }
    for (let k = 0; k < 2; k++) {
      randomColors.push(color);
    }
    color = '#';
  }

  return randomColors;
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function shuffledColors() {
  const randomColors = generateRandomColorsArray();
  shuffle(randomColors);
  return randomColors;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

// TODO: Implement this function!

function createDivsFor(randomColorArray) {
  const gameContainer = document.getElementById('game');

  for (let color of randomColorArray) {
    // create a new div
    const newDiv = document.createElement('div');
    newDiv.setAttribute('style', 'background-color:' + color);
    // give it a class attribute for the value we are looping over
    // newDiv.classList.add(color);
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
  return currentScore;
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const cardClicked = event.target;
  if (cardClicked) {
    console.log('you just clicked', cardClicked);
    currentScoreCounter();
  }
}

function addBestScoreToLocalStorage() {
  const currentScore = currentScoreCounter();
  localStorage.removeItem('bestScore');
  localStorage.setItem('bestScore', currentScore);
}

function compareCurrentAndBestScore() {
  const currentScore = currentScoreCounter();
  const bestScore = Number(localStorage.getItem('bestScore'));

  if (bestScore === 0) {
    addBestScoreToLocalStorage();
  } else if (bestScore > currentScore) {
    addBestScoreToLocalStorage();
  }
}

function loadBestScoreFromLocalStorage() {
  let bestScoreInLocalStorage = localStorage.getItem('bestScore');
  if (!bestScoreInLocalStorage) {
    bestScoreInLocalStorage = 0;
    localStorage.setItem('bestScore', bestScoreInLocalStorage);
  }

  const bestScoreNumDiv = document.getElementById('bestScoreNum');
  bestScoreNumDiv.innerHTML = bestScoreInLocalStorage;
}

function setUpCurrentScoreInLocalStorage() {
  const currentScoreNumDiv = document.getElementById('currentScoreNum');
  currentScoreNumDiv.innerHTML = 0;
  localStorage.setItem('gameScore', 0);
}

function loadPage() {
  const randomColors = shuffledColors();
  createDivsFor(randomColors);
  loadBestScoreFromLocalStorage();
  setUpCurrentScoreInLocalStorage();
}

/*on click add class
if card doesn't equal card, remove class otherwise keep class and don't allow second click
*/
