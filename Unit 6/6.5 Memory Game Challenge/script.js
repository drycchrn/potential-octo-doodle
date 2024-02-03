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
    newCard.addEventListener('click', countCardsRemaining);
    newCard.classList.add('card');

    gameContainer.append(newCard);

    numOfCard++;
  }
}

function incrementCurrentScore() {
  let currentScore = Number(localStorage.getItem('gameScore'));
  const currentScoreNumDiv = document.getElementById('currentScoreNum');

  currentScore += 1;
  currentScoreNumDiv.innerHTML = currentScore;

  localStorage.setItem('gameScore', currentScore);
  return currentScore;
}

function decrementCurrentScore() {
  let currentScore = Number(localStorage.getItem('gameScore'));
  const currentScoreNumDiv = document.getElementById('currentScoreNum');

  currentScore -= 1;
  currentScoreNumDiv.innerHTML = currentScore;

  localStorage.setItem('gameScore', currentScore);
  return currentScore;
}

function compareCurrentAndBestScoreAndAddToLocalStorage() {
  const currentScore = incrementCurrentScore();
  const bestScore = Number(localStorage.getItem('bestScore'));
  const bestScoreNum = document.getElementById('bestScoreNum');

  if (bestScore === 0) {
    localStorage.setItem('bestScore', currentScore);
    bestScoreNum.innerHTML = currentScore;
  } else if (bestScore > currentScore) {
    localStorage.removeItem('bestScore');
    localStorage.setItem('bestScore', currentScore);
    bestScoreNum.innerHTML = currentScore;
  }
}

function removeFirstCardIdentifiersFromLocalStorage() {
  localStorage.removeItem('firstCardClickedColor');
  localStorage.removeItem('firstCardClickedId');
}

function removeSecondCardIdentifiersFromLocalStorage() {
  localStorage.removeItem('secondCardClickedColor');
  localStorage.removeItem('secondCardClickedId');
}

function flipCard(event) {
  const cardClicked = event.target;
  const pickedCardColor = cardClicked.getAttribute('value');
  const pickedCardId = cardClicked.getAttribute('id');

  const firstCardColor = localStorage.getItem('firstCardClickedColor');
  const firstCardId = localStorage.getItem('firstCardClickedId');

  let secondCardColor = localStorage.getItem('secondCardClickedColor');
  let secondCardId = localStorage.getItem('secondCardClickedId');

  if (cardClicked) {
    if (!(firstCardColor && firstCardId)) {
      cardClicked.classList.remove('card');
      cardClicked.setAttribute('style', `background-color:${pickedCardColor}`);

      localStorage.setItem('firstCardClickedColor', pickedCardColor);
      localStorage.setItem('firstCardClickedId', pickedCardId);
    } else if (!(secondCardColor && secondCardId)) {
      cardClicked.classList.remove('card');
      cardClicked.setAttribute('style', `background-color:${pickedCardColor}`);

      localStorage.setItem('secondCardClickedColor', pickedCardColor);
      localStorage.setItem('secondCardClickedId', pickedCardId);

      secondCardColor = localStorage.getItem('secondCardClickedColor');
      secondCardId = localStorage.getItem('secondCardClickedId');

      const firstCardDiv = document.getElementById(firstCardId);
      const secondCardDiv = document.getElementById(secondCardId);

      if (secondCardId !== firstCardId) {
        if (secondCardColor !== firstCardColor) {
          const firstCardToReset = document.getElementById(firstCardId);
          const seconrdCardToReset = document.getElementById(secondCardId);

          setTimeout(() => {
            firstCardToReset.removeAttribute('style');
            seconrdCardToReset.removeAttribute('style');
            firstCardToReset.classList.add('card');
            seconrdCardToReset.classList.add('card');
            removeFirstCardIdentifiersFromLocalStorage();
            removeSecondCardIdentifiersFromLocalStorage();
          }, 1000);
        } else {
          removeFirstCardIdentifiersFromLocalStorage();
          removeSecondCardIdentifiersFromLocalStorage();

          firstCardDiv.removeEventListener('click', countCardsRemaining);
          secondCardDiv.removeEventListener('click', countCardsRemaining);
        }
      } else {
        const sameCardMessage = 'You cannot select the same card twice.';
        alert(sameCardMessage);
        decrementCurrentScore();
        removeSecondCardIdentifiersFromLocalStorage();
      }
    } else {
      const pleaseWaitMessage = 'Please wait before selecting another card.';
      alert(pleaseWaitMessage);
      decrementCurrentScore();
    }
  }
}

function countCardsRemaining() {
  const cardsRemaining = document.querySelectorAll('div.card').length;

  if (cardsRemaining === 1) {
    compareCurrentAndBestScoreAndAddToLocalStorage();
    flipCard(event);

    setTimeout(() => {
      const gameOverMessage = 'Game Over. Please play again.';
      alert(gameOverMessage);
    }, 500);
  } else {
    incrementCurrentScore();
    flipCard(event);
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
  removeFirstCardIdentifiersFromLocalStorage();
  removeSecondCardIdentifiersFromLocalStorage();
}

/*
if card doesn't equal card, remove class otherwise keep class and don't allow second click
*/
