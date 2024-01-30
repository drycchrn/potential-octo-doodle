function generateRandomColors() {
  //const pairInput = document.getElementById('pairInput');
  //const numOfColorsNeeded = pairInput.value;
  const numOfColorsNeeded = 5;
  const letterAndNum = '0123456789ABCDEF';
  let color = '#';
  const randomColorArray = [];

  for (let i = 0; i < numOfColorsNeeded; i++) {
    for (let j = 0; j < 6; j++) {
      color += letterAndNum[Math.floor(Math.random() * 16)];
    }
    for (let k = 0; k < 2; k++) {
      randomColorArray.push(color);
    }
    color = '#';
  }

  return randomColorArray;
}

function shuffle(randomColors) {
  let counter = randomColors.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = randomColors[counter];
    randomColors[counter] = randomColors[index];
    randomColors[index] = temp;
  }

  return randomColors;
}

function shuffledRandomColors() {
  const randomColors = generateRandomColors();
  shuffle(randomColors);

  return randomColors;
}

// TODO: game logic

function createCardDivsWith(randomColors) {
  const gameContainer = document.getElementById('game');

  for (let color of randomColors) {
    const newCard = document.createElement('div');

    newCard.setAttribute('value', color);
    newCard.addEventListener('click', handleCardClick);
    newCard.classList.add('card');

    gameContainer.append(newCard);
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
  const cardColor = cardClicked.getAttribute('value');

  if (cardClicked) {
    currentScoreCounter();
    console.log('you just clicked', cardClicked);

    cardClicked.classList.remove('card');

    cardClicked.setAttribute('style', `background-color:${cardColor}`);
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

function setUpCurrentScoreInLocalStorage() {
  const currentScoreNumDiv = document.getElementById('currentScoreNum');
  currentScoreNumDiv.innerHTML = 0;
  localStorage.setItem('gameScore', 0);
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

function loadPage() {
  const randomColors = shuffledRandomColors();
  createCardDivsWith(randomColors);

  setUpCurrentScoreInLocalStorage();
  loadBestScoreFromLocalStorage();
}

/*
if card doesn't equal card, remove class otherwise keep class and don't allow second click
*/
