//code abbreviation (Iden = Identifiers)

function generateRandomColorArrayWith(inputtedNumOfPairColorsNeeded) {
  const hexCodeLettersAndNums = '0123456789ABCDEF';
  let color = '#';
  const randomColorArray = [];

  for (let i = 0; i < inputtedNumOfPairColorsNeeded; i++) {
    for (let j = 0; j < 6; j++) {
      color += hexCodeLettersAndNums[Math.floor(Math.random() * 16)];
    }

    //to avoid having the same color in array twice
    if (randomColorArray.includes(color) !== -1) {
      for (let k = 0; k < 2; k++) {
        randomColorArray.push(color);
      }
    }

    color = '#';
  }

  return randomColorArray;
}

function helperFuncToShuffle(randomColorArray) {
  let counter = randomColorArray.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = randomColorArray[counter];
    randomColorArray[counter] = randomColorArray[index];
    randomColorArray[index] = temp;
  }

  return randomColorArray;
}

function shuffleRandomColorArrayWith(inputtedNumOfPairColorsNeeded) {
  const randomColorArray = generateRandomColorArrayWith(
    inputtedNumOfPairColorsNeeded
  );
  helperFuncToShuffle(randomColorArray);

  return randomColorArray;
}

function createCardsWithColorsFrom(shuffledRandomColorArray) {
  const gameContainerDiv = document.getElementById('game');
  const numOfCardsGenerated =
    gameContainerDiv.getElementsByTagName('div').length;

  if (numOfCardsGenerated === 0) {
    let idNumOfCard = 1;

    for (let color of shuffledRandomColorArray) {
      const newCardDiv = document.createElement('div');

      newCardDiv.setAttribute('id', idNumOfCard);
      newCardDiv.setAttribute('value', color);
      newCardDiv.addEventListener('click', countCardsRemaining);
      newCardDiv.classList.add('card');

      gameContainerDiv.append(newCardDiv);

      idNumOfCard++;
    }
  }
}

function increaseCurrentScore() {
  let currentScore = Number(localStorage.getItem('gameScore'));
  const currentScoreNumDiv = document.getElementById('currentScoreNum');

  currentScore += 1;
  currentScoreNumDiv.innerHTML = currentScore;

  localStorage.setItem('gameScore', currentScore);
  return currentScore;
}

//used to not penalize when same or more than one card is picked
function decreaseCurrentScore() {
  let currentScore = Number(localStorage.getItem('gameScore'));
  const currentScoreNumDiv = document.getElementById('currentScoreNum');

  currentScore -= 1;
  currentScoreNumDiv.innerHTML = currentScore;

  localStorage.setItem('gameScore', currentScore);
  return currentScore;
}

function compareCurrentAndBestScoreAndAddToLocalStorage() {
  const currentScore = increaseCurrentScore();
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

function remove1stCardIdenFromLocalStorage() {
  localStorage.removeItem('firstCardClickedColor');
  localStorage.removeItem('firstCardClickedId');
}

function remove2ndCardIdenFromLocalStorage() {
  localStorage.removeItem('secondCardClickedColor');
  localStorage.removeItem('secondCardClickedId');
}

function removeCardIdenFromLocalStorageAndEventListenerOnMatch(
  firstCardDiv,
  secondCardDiv
) {
  remove1stCardIdenFromLocalStorage();
  remove2ndCardIdenFromLocalStorage();

  firstCardDiv.removeEventListener('click', countCardsRemaining);
  secondCardDiv.removeEventListener('click', countCardsRemaining);
}

function resetCardColorsOf(firstCardToReset, seconrdCardToReset) {
  firstCardToReset.removeAttribute('style');
  seconrdCardToReset.removeAttribute('style');
  firstCardToReset.classList.add('card');
  seconrdCardToReset.classList.add('card');
}

function resetColorsAndRemoveIdenIfNotMatchedOf(firstCardId, secondCardId) {
  const firstCardToReset = document.getElementById(firstCardId);
  const secondCardToReset = document.getElementById(secondCardId);

  setTimeout(() => {
    resetCardColorsOf(firstCardToReset, secondCardToReset);
    remove1stCardIdenFromLocalStorage();
    remove2ndCardIdenFromLocalStorage();
  }, 1000);
}

function alertWhenTheSameCardIsClicked() {
  const sameCardMessage = 'You cannot select the same card twice.';
  alert(sameCardMessage);
  decreaseCurrentScore();
  remove2ndCardIdenFromLocalStorage();
}

function alertWhenMoreThanOneCardIsClicked() {
  const pleaseWaitMessage = 'Please wait before selecting another card.';
  alert(pleaseWaitMessage);
  decreaseCurrentScore();
}

function alertWhenGameIsOver() {
  const gameOverMessage = 'All matches found! 🎉 \nPlease play again.';
  alert(gameOverMessage);
}

function changeColorOf(cardClicked, pickedCardColor) {
  cardClicked.classList.remove('card');
  cardClicked.setAttribute('style', `background-color:${pickedCardColor}`);
}

function addToLocalStorage1stCardIdenOf(pickedCardColor, pickedCardId) {
  localStorage.setItem('firstCardClickedColor', pickedCardColor);
  localStorage.setItem('firstCardClickedId', pickedCardId);
}

function addToLocalStorage2ndCardIdenOf(pickedCardColor, pickedCardId) {
  localStorage.setItem('secondCardClickedColor', pickedCardColor);
  localStorage.setItem('secondCardClickedId', pickedCardId);
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
      changeColorOf(cardClicked, pickedCardColor);
      addToLocalStorage1stCardIdenOf(pickedCardColor, pickedCardId);
    } else if (!(secondCardColor && secondCardId)) {
      changeColorOf(cardClicked, pickedCardColor);
      addToLocalStorage2ndCardIdenOf(pickedCardColor, pickedCardId);

      secondCardColor = localStorage.getItem('secondCardClickedColor');
      secondCardId = localStorage.getItem('secondCardClickedId');

      const firstCardDiv = document.getElementById(firstCardId);
      const secondCardDiv = document.getElementById(secondCardId);

      if (secondCardId !== firstCardId) {
        if (secondCardColor !== firstCardColor) {
          resetColorsAndRemoveIdenIfNotMatchedOf(firstCardId, secondCardId);
        } else {
          removeCardIdenFromLocalStorageAndEventListenerOnMatch(
            firstCardDiv,
            secondCardDiv
          );
        }
      } else {
        alertWhenTheSameCardIsClicked();
      }
    } else {
      alertWhenMoreThanOneCardIsClicked();
    }
  }
}

function countCardsRemaining() {
  const cardsRemaining = document.querySelectorAll('div.card').length;

  if (cardsRemaining === 1) {
    compareCurrentAndBestScoreAndAddToLocalStorage();
    flipCard(event);

    setTimeout(() => {
      alertWhenGameIsOver();
    }, 500);
  } else {
    increaseCurrentScore();
    flipCard(event);
  }
}

function resetCurrentScoreToZeroInLocalStorage() {
  const currentScoreNumDiv = document.getElementById('currentScoreNum');
  currentScoreNumDiv.innerHTML = 0;
  localStorage.setItem('gameScore', 0);
}

function setBestScoreToZeroIfNoBestScoreInLocalStorage(
  bestScoreInLocalStorage
) {
  bestScoreInLocalStorage = 0;
  localStorage.setItem('bestScore', bestScoreInLocalStorage);
  return bestScoreInLocalStorage;
}

function loadBestScoreFromLocalStorage() {
  let bestScoreInLocalStorage = localStorage.getItem('bestScore');
  if (!bestScoreInLocalStorage) {
    bestScoreInLocalStorage = setBestScoreToZeroIfNoBestScoreInLocalStorage(
      bestScoreInLocalStorage
    );
  }

  const bestScoreNumDiv = document.getElementById('bestScoreNum');
  bestScoreNumDiv.innerHTML = bestScoreInLocalStorage;

  //TODO: further development - best score
  //store/load best score by pair numbers selected
  //i.e. if you select 2 pairs and get best score of 4,
  //best score will always be 4 unless removed from
  //local storage
}

function startGame(event) {
  loadPage();

  const game = document.getElementById('game');
  game.innerHTML = '';

  const pairInput = document.getElementById('pairInput');
  const numOfPairsColorsNeeded = pairInput.valueAsNumber;
  //TODO: further development - pair input
  //verification to ensure too large of number or negative
  //number doesn't crash site

  const shuffledRandomColorArray = shuffleRandomColorArrayWith(
    numOfPairsColorsNeeded
  );

  createCardsWithColorsFrom(shuffledRandomColorArray);
}

function loadPage() {
  resetCurrentScoreToZeroInLocalStorage();
  loadBestScoreFromLocalStorage();
  remove1stCardIdenFromLocalStorage();
  remove2ndCardIdenFromLocalStorage();

  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);
}
