function createLi(numOfTodoForLi, todoStatus) {
  const newLi = document.createElement('li');
  const numberedLi = `todo-${numOfTodoForLi}`;

  newLi.setAttribute('id', numberedLi);

  if (todoStatus) {
    newLi.classList.add('completedTodo');
  }

  return newLi;
}

function createSpan(todoTextforSpan) {
  const newSpan = document.createElement('span');

  newSpan.innerHTML = todoTextforSpan;

  return newSpan;
}

function getIdNum() {
  const currentLiElements = document.getElementById('todoList').children;
  let highestNum = 0;

  for (const li of currentLiElements) {
    const id = li.getAttribute('id');
    const splitId = id.split('-')[1];
    const idNum = Number(splitId);

    if (idNum > highestNum) {
      highestNum = idNum;
    }
  }

  return highestNum + 1;
}

function remTodoFromLocalStorage(numOfTodo) {
  localStorage.removeItem(`data-${numOfTodo}`);
}

function loadLocalStorage() {
  const loadList = { ...localStorage };
  const dataIds = Object.keys(loadList).sort();
  for (const dataId of dataIds) {
    const data = JSON.parse(loadList[dataId]);
    addTodoToList(data.id, data.text, data.check);
  }
}

function addTodoToLocalStorage(numOfTodo, todoText) {
  const data = {
    id: numOfTodo,
    text: todoText,
    check: false,
  };

  localStorage.setItem(`data-${numOfTodo}`, JSON.stringify(data));
}

function completedInLocalStorage(numOfTodo) {
  const localStorageId = `data-${numOfTodo}`;
  const numOfCheck = JSON.parse(localStorage.getItem(localStorageId));
  numOfCheck.check = true;
  localStorage.setItem(localStorageId, JSON.stringify(numOfCheck));
}

function incompleteInLocalStorage(numOfTodo) {
  const localStorageId = `data-${numOfTodo}`;
  const numOfCheck = JSON.parse(localStorage.getItem(localStorageId));
  numOfCheck.check = false;
  localStorage.setItem(localStorageId, JSON.stringify(numOfCheck));
}

function toggleTodo(event) {
  const checkbox = event.target;
  const { id } = checkbox;
  const numOfTodo = id.split('-')[1];
  const todo = document.getElementById(`todo-${numOfTodo}`);

  if (checkbox.checked) {
    todo.classList.add('completedTodo');
    completedInLocalStorage(numOfTodo);
  } else {
    todo.classList.remove('completedTodo');
    incompleteInLocalStorage(numOfTodo);
  }
}

function createCheckbox(numOfTodoForCheck, todoStatus) {
  const newCheckbox = document.createElement('input');
  const numberedCheckbox = `toggleTodo-${numOfTodoForCheck}`;

  newCheckbox.setAttribute('type', 'checkbox');
  newCheckbox.setAttribute('id', numberedCheckbox);
  newCheckbox.setAttribute('title', 'Complete Todo');
  newCheckbox.addEventListener('click', toggleTodo);

  if (todoStatus) {
    newCheckbox.checked = true;
  }

  return newCheckbox;
}

function addTodoToList(numOfTodo, todoText, todoStatus) {
  const ul = document.getElementById('todoList');
  const createdTodo = createTodo(numOfTodo, todoText, todoStatus);
  ul.append(createdTodo);
}

function getTodoInputAndAddTodoToList() {
  const todoText = document.getElementById('newTodo').value;
  if (todoText.length < 3) {
    const alert = 'Please input more text.';
    alert();
  } else {
    const numOfTodo = getIdNum();
    document.getElementById('newTodo').value = '';
    addTodoToList(numOfTodo, todoText, false);
    addTodoToLocalStorage(numOfTodo, todoText);
  }

  return false;
}

function removeTodo(event) {
  const trashcan = event.target;
  const { id } = trashcan;
  const numOfTodo = id.split('-')[1];
  const todo = document.getElementById(`todo-${numOfTodo}`);

  todo.remove();
  remTodoFromLocalStorage(numOfTodo);
}

function createRemButton(numOfTodoForRem) {
  const newRemButton = document.createElement('button');
  const numberedRemButton = `removeTodo-${numOfTodoForRem}`;

  newRemButton.classList.add('removeTodo');
  newRemButton.setAttribute('type', 'submit');
  newRemButton.setAttribute('id', numberedRemButton);
  newRemButton.setAttribute('title', 'Remove Todo');
  newRemButton.innerHTML = '🗑️';
  newRemButton.addEventListener('click', removeTodo);

  return newRemButton;
}

function createTodo(numOfTodo, todoText, todoStatus) {
  const li = createLi(numOfTodo, todoStatus);
  const checkbox = createCheckbox(numOfTodo, todoStatus);
  const span = createSpan(todoText);
  const remButton = createRemButton(numOfTodo);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(remButton);
  return li;
}
