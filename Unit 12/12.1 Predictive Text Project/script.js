const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple 🍎', 'Apricot', 'Avocado 🥑', 'Banana 🍌', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry 🫐', 'Boysenberry', 'Currant', 'Cherry 🍒', 'Coconut 🥥', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape 🍇', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit 🥝', 'Kumquat', 'Lemon 🍋', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango 🥭', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe 🍈', 'Honeydew', 'Watermelon 🍉', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange 🍊', 'Clementine', 'Mandarine', 'Tangerine 🍊', 'Papaya', 'Passionfruit', 'Peach 🍑', 'Pear 🍐', 'Persimmon', 'Plantain', 'Plum', 'Pineapple 🍍', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry 🍒', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
  const results = fruits.filter((fruit) => fruit.toLowerCase().includes(str));
  return results;
}

//  Why do you need inputVal if you already have results?
function showSuggestions(results /* , inputVal */) {
  results.forEach((result) => {
    const newLiElement = document.createElement('li');
    newLiElement.innerHTML = result;
    suggestions.appendChild(newLiElement);
  });
}

function searchHandler(e) {
  const userInput = e.target.value;

  suggestions.innerHTML = '';

  if (userInput.length !== 0) {
    const searchResults = search(userInput.toLowerCase());
    showSuggestions(searchResults, userInput);
  }
}

function useSuggestion(e) {
  const selectionFromResults = e.target.innerHTML;
  input.value = selectionFromResults;
  suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
