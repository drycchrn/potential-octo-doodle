function createEmptyDiv() {
  const emptyDivElement = document.createElement('div');
  return emptyDivElement;
}

function deleteMemeFromLocalStorage(idNum) {
  localStorage.removeItem(`memeInLocalStorage-${idNum}`);
}

function deleteMeme(event) {
  const deleteButton = event.target.id;
  const numOfMemeBeingDeleted = Number(deleteButton.split('-')[1]);
  const memeOnPage = document.getElementById(`meme-${numOfMemeBeingDeleted}`);

  memeOnPage.remove();
  deleteMemeFromLocalStorage(numOfMemeBeingDeleted);
}

function createDeleteButton(idNum) {
  const newDeleteButton = document.createElement('button');

  newDeleteButton.setAttribute('type', 'submit');
  newDeleteButton.setAttribute('title', 'Delete Meme');
  newDeleteButton.setAttribute('id', `delete-${idNum}`);
  newDeleteButton.innerHTML = '🗑️';
  newDeleteButton.classList.add('deleteButton');
  newDeleteButton.addEventListener('click', deleteMeme);

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

function combineAllInputsIntoDiv(
  idNum,
  topTextInput,
  imageUrlInput,
  bottomTextInput
) {
  const memeAndButtonDiv = createEmptyDiv();
  const memeDiv = createEmptyDiv();

  const topTextDiv = createTopTextDivWith(topTextInput);
  const imageDiv = createImageDivWith(imageUrlInput);
  const bottomTextDiv = createBottomTextDivWith(bottomTextInput);
  const deleteButton = createDeleteButton(idNum);

  memeDiv.append(topTextDiv);
  memeDiv.append(imageDiv);
  memeDiv.append(bottomTextDiv);
  memeDiv.classList.add('memeChildDiv');

  memeAndButtonDiv.append(memeDiv);
  memeAndButtonDiv.append(deleteButton);
  memeAndButtonDiv.setAttribute('id', `meme-${idNum}`);
  memeAndButtonDiv.classList.add('memeTextFormat');

  return memeAndButtonDiv;
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
    const newMeme = combineAllInputsIntoDiv(
      idNum,
      topText,
      imageUrl,
      bottomText
    );
    const createdMemes = document.getElementById('createdMemes');
    createdMemes.appendChild(newMeme);
  } else {
    const alert = 'Please provide an image in jpg, jpeg, or png format.';
    alert();
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

function submitMeme() {
  const topText = retrieveTopTextAndClearInput();
  const imageUrl = retrieveImageUrlAndClearInput();
  const bottomText = retrieveBottomTextAndClearInput();
  const idNum = getNextIdNum();

  addMemeToPage(idNum, topText, imageUrl, bottomText);
  addMemeToLocalStorage(idNum, topText, imageUrl, bottomText);
}

function loadMemesFromLocalStorage() {
  const loadMemes = { ...localStorage };
  const dataIds = Object.keys(loadMemes).sort(
    (a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1])
  );

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
