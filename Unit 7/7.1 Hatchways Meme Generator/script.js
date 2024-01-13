function loadMemesFromLocalStorage() {
  const loadMemes = { ...localStorage };
}

function addMemeToLocalStorage() {
  const memeLocalStorageData = {
    id: numOfMeme,
    topText,
    bottomText,
    imageURL,
  };

  localStorage.setItem(
    `meme-${numOfMeme}`,
    JSON.stringify(memeLocalStorageData)
  );
}

function removeMemeFromLocalStorage() {
  localStorage.removeItem(`meme-${numOfMeme}`);
}

function createEmptyDiv() {
  const newDivElement = document.createElement('div');
  newDivElement.setAttribute('id', `meme-${numOfMeme}`);

  return newDivElement;
}

function retrieveTopTextAndClearInput() {
  const topTextInput = document.getElementById('topTextInput').value;
  document.getElementById('topTextInput').value = '';

  return topTextInput;
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

confirmFileType(imageUrlInput, fileType) {
  return imageUrlInput;
}

function validateUrlInput(imageUrlInput) {
  const jpegConfirm = confirmFileType(imageUrlInput, "jpeg");
  const jpgConfirm = confirmFileType(imageUrlInput, "jpg");
  const pngConfirm = confirmFileType(imageUrlInput, "png");

  const alert = 'Please provide an image in jpg, jpeg, or png format.';
  if ((jpegConfirm || jpgConfirm || pngConfirm) = false) {
    alert(alert);
  }
}


function allMemesCreatedDiv() {
  const allMemesCreated = createEmptyDiv();
  allMemesCreated.setAttribute('id', 'allMemesCreated');

  return allMemesCreated;
}

function createTopTextDiv() {
  const topTextDiv = createEmptyDiv();
  const topText = retrieveTopTextAndClearInput();

  topTextDiv.setAttribute('id', `topText-${numOfMeme}`);
  topTextDiv.innerHTML = topText;

  return topTextDiv;
}

function createImageDiv() {
  const imageDiv = createEmptyDiv();
  const createImageElement = document.createElement('img');

  createImageElement.setAttribute('src', retrieveImageUrlAndClearInput);
  imageDiv.appendChild(createImageElement);

  return imageDiv;
}

function createBottomTextDiv() {
  const bottomTextDiv = createEmptyDiv();
  const bottomText = retrieveBottomTextAndClearInput();

  bottomTextDiv.setAttribute('id', 'bottomTextDiv');
  bottomTextDiv.innerHTML = bottomText;

  return bottomTextDiv;
}

function deleteMeme() {
  const placeholder = document.getElementById('placeholder');

  placeholder.remove();
  removeMemeFromLocalStorage();
}

function createDeleteButton() {
  const newDeleteButton = document.createElement('button');

  newDeleteButton.setAttribute('type', 'submit');
  newDeleteButton.setAttribute('title', 'Delete Meme');
  newDeleteButton.innerHTML = '🗑️';
  newDeleteButton.addEventListener('click', deleteMeme);

  return newDeleteButton;
}

function combineAllInputsIntoDiv() {
  const memeDiv = createEmptyDiv();

  const topTextDiv = createTopTextDiv();
  const imageDiv = createImageDiv();
  const bottomText = createBottomTextDiv();
  const deleteButton = createDeleteButton();

  memeDiv.append(topTextDiv);
  memeDiv.append(imageDiv);
  memeDiv.append(bottomText);
  memeDiv.append(deleteButton);
  memeDiv.classList.add('.CSSPLACEHOLDER');

  return memeDiv;
}

function addNewMemeToCreatedMemes() {
  const newMeme = combineAllInputsIntoDiv();
  const allMemesCreated = allMemesCreatedDiv();
  allMemesCreated.appendChild(newMeme);
}