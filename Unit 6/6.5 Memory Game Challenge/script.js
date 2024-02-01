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

function createCardsWith(randomColors) {
  const gameContainer = document.getElementById('game');
  let numOfCard = 1;

  for (let color of randomColors) {
    const newCard = document.createElement('div');

    newCard.setAttribute('id', numOfCard);
    newCard.setAttribute('value', color);
    newCard.addEventListener('click', cardFlip);
    newCard.classList.add('card');

    gameContainer.append(newCard);

    numOfCard++;
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
function removeFirstCardIdentifiersFromLocalStorage() {
  localStorage.removeItem('firstCardClickedColor');
  localStorage.removeItem('firstCardClickedId');
}

function cardFlip(event) {
  const cardClicked = event.target;
  const pickedCardColor = cardClicked.getAttribute('value');
  const pickedCardId = cardClicked.getAttribute('id');

  const firstCardColor = localStorage.getItem('firstCardClickedColor');
  const firstCardId = localStorage.getItem('firstCardClickedId');

  const firstCardToReset = document.getElementById(firstCardId);
  const seconrdCardToReset = document.getElementById(pickedCardId);

  if (cardClicked) {
    currentScoreCounter();
    console.log('you just clicked', cardClicked);

    cardClicked.classList.remove('card');

    cardClicked.setAttribute('style', `background-color:${pickedCardColor}`);
  }

  if (!(firstCardColor && firstCardId)) {
    localStorage.setItem('firstCardClickedColor', pickedCardColor);
    localStorage.setItem('firstCardClickedId', pickedCardId);
  } else if (pickedCardId !== firstCardId) {
    if (pickedCardColor !== firstCardColor) {
      setTimeout(() => {
        firstCardToReset.removeAttribute('style');
        seconrdCardToReset.removeAttribute('style');
        firstCardToReset.classList.add('card');
        seconrdCardToReset.classList.add('card');
      }, 5000);
      removeFirstCardIdentifiersFromLocalStorage();
    }
    removeFirstCardIdentifiersFromLocalStorage();
  }
}

/*
const cards = document.querySelectorAll('div.card');
const numOfCardsLeft = cards.length;

if(numOfCardsLeft !== 0) {
  game ends
} else {
  const gameEndedMessage = 'The game is over. Please play again!'
  alert(gameEndedMessage);
}

function cardReset(event) {
  const cardClicked = event.target;
  const cardId = cardClicked.getAttribute('id');
  const firstCardId = localStorage.getItem('firstCardClickedId');

  const firstCardToReset = document.getElementById(firstCardId);
  const seconrdCardToReset = document.getElementById(cardId);

  firstCardToReset.removeAttribute('style');
  seconrdCardToReset.removeAttribute('style');
  firstCardToReset.classList.add('card');
  seconrdCardToReset.classList.add('card');
}

function gameLogic() {



  if (value !==value){
  cardReset();
  } else if (value===value && id === id) {
  const message = 'Please select another card.';
  alert(message);
  cardReset();
  } else {
  const cardClicked = event.target;
  cardClicked.removeEventListener('click', cardFlip, false);
  }
  //if value != value
  //remove background-color and assign card class
  //else if value===value && id === id
  //alert you cannot select the same card twice please pick another card
  //else remove event listener

  //how to store the click? 

}
*/
// TODO: game logic

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
/*
function restartGame() {
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', createCardsWith);
}

function startGame() {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', createCardsWith);
}
*/
function loadPage() {
  const randomColors = shuffledRandomColors();
  createCardsWith(randomColors);
  //startGame();
  //restartGame();
  setUpCurrentScoreInLocalStorage();
  loadBestScoreFromLocalStorage();
}

/*
if card doesn't equal card, remove class otherwise keep class and don't allow second click
*/
