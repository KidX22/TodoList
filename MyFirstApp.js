//Querys

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  //prevents form from submitting(refreshing the page)
  event.preventDefault();
  //todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  //checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  //clear todoInput value
  todoInput.value = null;
}
function deleteAndCheck(event) {
  //remove default function
  event.preventDefault();
  const item = event.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorageTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //chechmark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    //Check if the item is completed
    if (todo.classList.contains("completed")) {
      //add to completed list
      SavelocalCompleted(item.parentElement.innerText);
      //set completed to false
    } else {
      //remove from the completed list
      removeLocalcompleted(item.parentElement.innerText);
      //set completed to true
    }
    //add completed tag to an item
    //add that item to the list of completed items if it is not on there
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  //get comleteds list
  let completeds;
  if (localStorage.getItem("completeds") === null) {
    completeds = [];
  } else {
    completeds = JSON.parse(localStorage.getItem("completeds"));
  }
  // get todos list
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    completeds.forEach(function (completed) {
      if (completed == todo) todoDiv.classList.toggle("completed");
    });
  });
}
function removeLocalStorageTodo(todo) {
  if (localStorage.getItem("completeds") === null) {
    completeds = [];
  } else {
    completeds = JSON.parse(localStorage.getItem("completeds"));
  }
  const completedIndex = todo.parentElement.innerText;
  completeds.splice(completeds.indexOf(completedIndex), 1);
  localStorage.setItem("completeds", JSON.stringify(completeds));

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function SavelocalCompleted(completed) {
  let completeds;
  if (localStorage.getItem("completeds") === null) {
    completeds = [];
  } else {
    completeds = JSON.parse(localStorage.getItem("completeds"));
  }
  completeds.push(completed);
  localStorage.setItem("completeds", JSON.stringify(completeds));
}

function removeLocalcompleted(completed) {
  if (localStorage.getItem("completeds") === null) {
    completeds = [];
  } else {
    completeds = JSON.parse(localStorage.getItem("completeds"));
  }
  const completedIndex = completed;
  completeds.splice(completeds.indexOf(completedIndex), 1);
  localStorage.setItem("completeds", JSON.stringify(completeds));
}
