function createTodo(numOfTodo, todoText, todoStatus) {
  var li = createLi(numOfTodo, todoStatus);
  var checkbox = createCheckbox(numOfTodo, todoStatus);
  var span = createSpan(todoText);
  var remButton = createRemButton(numOfTodo);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(remButton);
  return li;
}

function createLi(numOfTodoForLi, todoStatus) {
  var newLi = document.createElement("li");
  var numberedLi = "todo-" + numOfTodoForLi;

  newLi.setAttribute("id", numberedLi);

  if (todoStatus) {
    newLi.classList.add("completedTodo");
  }

  return newLi;
}

function createCheckbox(numOfTodoForCheck, todoStatus) {
  var newCheckbox = document.createElement("input");
  var numberedCheckbox = "toggleTodo-" + numOfTodoForCheck;

  newCheckbox.setAttribute("type", "checkbox");
  newCheckbox.setAttribute("id", numberedCheckbox);
  newCheckbox.setAttribute("title", "Complete Todo");
  newCheckbox.addEventListener("click", toggleTodo);

  if (todoStatus) {
    newCheckbox.checked = true;
  }

  return newCheckbox;
}

function createSpan(todoTextforSpan) {
  var newSpan = document.createElement("span");

  newSpan.innerHTML = todoTextforSpan;

  return newSpan;
}

function createRemButton(numOfTodoForRem) {
  var newRemButton = document.createElement("button");
  var numberedRemButton = "removeTodo-" + numOfTodoForRem;

  newRemButton.classList.add("removeTodo");
  newRemButton.setAttribute("type", "submit");
  newRemButton.setAttribute("id", numberedRemButton);
  newRemButton.setAttribute("title", "Remove Todo");
  newRemButton.innerHTML = "🗑️";
  newRemButton.addEventListener("click", removeTodo);

  return newRemButton;
}

function getIdNum() {
  var currentLiElements = document.getElementById("todoList").children;
  var highestNum = 0;

  for (var li of currentLiElements) {
    var id = li.getAttribute("id");
    var splitId = id.split("-")[1];
    var idNum = Number(splitId);

    if (idNum > highestNum) {
      highestNum = idNum;
    }
  }

  return highestNum + 1;
}

function addTodoToList(numOfTodo, todoText, todoStatus) {
  const ul = document.getElementById("todoList");
  var createdTodo = createTodo(numOfTodo, todoText, todoStatus);
  ul.append(createdTodo);
}

function getTodoInputAndAddTodoToList(event) {
  var todoText = document.getElementById("newTodo").value;
  if (todoText.length < 3) {
    alert("Please input more text.");
  } else {
    var numOfTodo = getIdNum();
    document.getElementById("newTodo").value = "";
    addTodoToList(numOfTodo, todoText, false);
    addTodoToLocalStorage(numOfTodo, todoText);
  }

  return false;
}

function toggleTodo(event) {
  var checkbox = event.target;
  var id = checkbox.id;
  var numOfTodo = id.split("-")[1];
  var todo = document.getElementById("todo-" + numOfTodo);

  if (checkbox.checked) {
    todo.classList.add("completedTodo");
    completedInLocalStorage(numOfTodo);
  } else {
    todo.classList.remove("completedTodo");
    incompleteInLocalStorage(numOfTodo);
  }
}

function removeTodo(event) {
  var trashcan = event.target;
  var id = trashcan.id;
  var numOfTodo = id.split("-")[1];
  var todo = document.getElementById("todo-" + numOfTodo);

  todo.remove();
  remTodoFromLocalStorage(numOfTodo);
}

function remTodoFromLocalStorage(numOfTodo) {
  localStorage.removeItem("data-" + numOfTodo);
}

function loadLocalStorage() {
  const loadList = { ...localStorage };
  var dataIds = Object.keys(loadList).sort();
  for (var dataId of dataIds) {
    var data = JSON.parse(loadList[dataId]);
    addTodoToList(data.id, data.text, data.check);
  }
}

function addTodoToLocalStorage(numOfTodo, todoText) {
  var data = {
    id: numOfTodo,
    text: todoText,
    check: false,
  };

  localStorage.setItem("data-" + numOfTodo, JSON.stringify(data));
}

function completedInLocalStorage(numOfTodo) {
  var localStorageId = "data-" + numOfTodo;
  var numOfCheck = JSON.parse(localStorage.getItem(localStorageId));
  numOfCheck.check = true;
  localStorage.setItem(localStorageId, JSON.stringify(numOfCheck));
}

function incompleteInLocalStorage(numOfTodo) {
  var localStorageId = "data-" + numOfTodo;
  var numOfCheck = JSON.parse(localStorage.getItem(localStorageId));
  numOfCheck.check = false;
  localStorage.setItem(localStorageId, JSON.stringify(numOfCheck));
}
