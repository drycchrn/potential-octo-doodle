function createEmptyDiv() {
  const emptyDivElement = document.createElement('div');
  return emptyDivElement;
}

function removeFromLocalStorageTheKeyValuePairOfMeme(idNum) {
  localStorage.removeItem(`memeInLocalStorage-${idNum}`);
}

function deleteMemeFromPageAndRemoveFromLocalStorageOn(event) {
  const deleteButton = event.target.id;
  const numOfMemeBeingDeleted = Number(deleteButton.split('-')[1]);
  const memeDivOnPage = document.getElementById(
    `meme-${numOfMemeBeingDeleted}`
  );

  memeDivOnPage.remove();
  removeFromLocalStorageTheKeyValuePairOfMeme(numOfMemeBeingDeleted);
}

function createDeleteButtonForMeme(idNum) {
  const newDeleteButton = document.createElement('button');

  newDeleteButton.setAttribute('type', 'submit');
  newDeleteButton.setAttribute('title', 'Delete Meme');
  newDeleteButton.setAttribute('id', `delete-${idNum}`);
  newDeleteButton.innerHTML = '🗑️';
  newDeleteButton.classList.add('deleteButton');
  newDeleteButton.addEventListener(
    'click',
    deleteMemeFromPageAndRemoveFromLocalStorageOn
  );

  return newDeleteButton;
}

function createBottomTextDivWith(bottomTextInput) {
  const bottomTextDiv = createEmptyDiv();

  bottomTextDiv.innerHTML = bottomTextInput;
  bottomTextDiv.classList.add('bottomTextPosition');

  return bottomTextDiv;
}

function createImageDivWith(imageUrlInput) {
  const imageDiv = createEmptyDiv();
  const createImageElement = document.createElement('img');

  createImageElement.setAttribute('src', imageUrlInput);
  imageDiv.appendChild(createImageElement);

  return imageDiv;
}

function createTopTextDivWith(topTextInput) {
  const topTextDiv = createEmptyDiv();

  topTextDiv.innerHTML = topTextInput;
  topTextDiv.classList.add('topTextPosition');

  return topTextDiv;
}

function createMemeDivWith(topTextInput, imageUrlInput, bottomTextInput) {
  const memeDiv = createEmptyDiv();
  const topTextDiv = createTopTextDivWith(topTextInput);
  const imageDiv = createImageDivWith(imageUrlInput);
  const bottomTextDiv = createBottomTextDivWith(bottomTextInput);

  memeDiv.append(topTextDiv);
  memeDiv.append(imageDiv);
  memeDiv.append(bottomTextDiv);
  memeDiv.classList.add('memeChildDiv');
  return memeDiv;
}

function createDivWithMemeAndDeleteButtonWith(
  idNum,
  topTextInput,
  imageUrlInput,
  bottomTextInput
) {
  const divForMemeAndDeleteButton = createEmptyDiv();
  const memeImageAndTextDiv = createMemeDivWith(
    topTextInput,
    imageUrlInput,
    bottomTextInput
  );
  const deleteButton = createDeleteButtonForMeme(idNum);

  divForMemeAndDeleteButton.append(memeImageAndTextDiv);
  divForMemeAndDeleteButton.append(deleteButton);
  divForMemeAndDeleteButton.setAttribute('id', `meme-${idNum}`);
  divForMemeAndDeleteButton.classList.add('memeTextFormat');

  return divForMemeAndDeleteButton;
}

function getUrlEndOf(imageUrlInput) {
  const endOfUrlInput = imageUrlInput.slice(-4);
  return endOfUrlInput;
}

function validateUrlEndingOf(imageUrlInput) {
  const endOfUrl = getUrlEndOf(imageUrlInput);
  const jpegConfirm = endOfUrl.includes('jpeg');
  const jpgConfirm = endOfUrl.includes('jpg');
  const pngConfirm = endOfUrl.includes('png');

  if (jpegConfirm || jpgConfirm || pngConfirm) {
    return true;
  }

  return false;
}

function retrieveTopTextAndClearInput() {
  const topText = document.getElementById('topTextInput').value;
  document.getElementById('topTextInput').value = '';

  return topText;
}

function retrieveImageUrlAndClearInput() {
  const imageUrl = document.getElementById('imageUrlInput').value;
  document.getElementById('imageUrlInput').value = '';

  return imageUrl;
}

function retrieveBottomTextAndClearInput() {
  const bottomText = document.getElementById('bottomTextInput').value;
  document.getElementById('bottomTextInput').value = '';

  return bottomText;
}

function getNextIdNum() {
  const loadLocalStorage = { ...localStorage };
  const localStorageKeys = Object.keys(loadLocalStorage);
  let highestNum = 0;

  for (const key of localStorageKeys) {
    const numOfKey = Number(key.split('-')[1]);
    if (numOfKey > highestNum) {
      highestNum = numOfKey;
    }
  }

  return highestNum + 1;
}

function addMemeToPage(idNum, topText, imageUrl, bottomText) {
  const validateUrl = validateUrlEndingOf(imageUrl);

  if (validateUrl) {
    const newMeme = createDivWithMemeAndDeleteButtonWith(
      idNum,
      topText,
      imageUrl,
      bottomText
    );
    const createdMemes = document.getElementById('createdMemes');
    createdMemes.appendChild(newMeme);
    return true;
  } else {
    const correctFormatMessage =
      'Please provide an image in jpg, jpeg, or png format and try again.';
    alert(correctFormatMessage);
    return false;
  }
}

function addMemeToLocalStorage(idNum, topText, imageUrl, bottomText) {
  const memeLocalStorageData = {
    id: idNum,
    top: topText,
    image: imageUrl,
    bottom: bottomText,
  };

  localStorage.setItem(
    `memeInLocalStorage-${idNum}`,
    JSON.stringify(memeLocalStorageData)
  );
}

function submitMeme(event) {
  event.preventDefault();
  const topText = retrieveTopTextAndClearInput();
  const imageUrl = retrieveImageUrlAndClearInput();
  const bottomText = retrieveBottomTextAndClearInput();
  const idNum = getNextIdNum();

  const result = addMemeToPage(idNum, topText, imageUrl, bottomText);
  if (result) {
    addMemeToLocalStorage(idNum, topText, imageUrl, bottomText);
  }
}

function loadMemesFromLocalStorage() {
  const loadMemes = { ...localStorage };
  const dataIds = Object.keys(loadMemes).sort(
    (a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1])
  );
  //sort to ensure memes stay in order after 9+ memes are on the page

  for (const dataId of dataIds) {
    const data = JSON.parse(loadMemes[dataId]);
    addMemeToPage(data.id, data.top, data.image, data.bottom);
  }
}

function loadPage() {
  loadMemesFromLocalStorage();

  const form = document.getElementById('form');
  form.addEventListener('submit', submitMeme, true);
}
