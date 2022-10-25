document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const todoButton = document.querySelector('.todo__btn');
  const removeComplitedBtn = document.querySelector('.js-complited-clear');

  todoButton.addEventListener('click', addToDo);

  removeComplitedBtn.addEventListener('click', removeComlitedItems);

  getToDoCount();
  todoAction();
  getActiveTabItems();
  chooseActiveTab();
}

function getToDoCount() {
  const todoList = document.querySelectorAll('.item');
  const countText = document.querySelector('.js_items-left');
  const complitedItems = document.querySelectorAll('.item--completed');

  countText.textContent = todoList.length - complitedItems.length;
}

function addToDo(e) {
  //Prevent natural behaviour
  e.preventDefault();

  const todoInput = document.querySelector('.todo__input');
  const todoList = document.querySelector('.todo__list');

  if (todoInput.value != '') {
    //Create todo item li
    const todoListItem = document.createElement('li'),
      todoButtonComplited = document.createElement('button'),
      todoButtonTrash = document.createElement('button'),
      todoText = document.createElement('p');

    todoListItem.classList.add('list__item', 'item');
    todoButtonComplited.classList.add('item__circle', 'js_complited');
    todoButtonTrash.classList.add('item__cross', 'js_trash');
    todoText.classList.add('item__text');

    todoButtonComplited.addEventListener('click', complitedTodo);
    todoButtonTrash.addEventListener('click', deleteTodo);

    todoText.textContent = todoInput.value;

    saveLocalTodos(todoInput.value);

    todoListItem.appendChild(todoButtonComplited);
    todoListItem.appendChild(todoText);
    todoListItem.appendChild(todoButtonTrash);

    todoList.appendChild(todoListItem);

    todoInput.value = '';
    getToDoCount();
  }
}

function deleteTodo() {
  const todoItem = this.parentElement;
  todoItem.classList.add('item--remove');

  removeLocalTodos(todoItem);

  todoItem.addEventListener('transitionend', (e) => {
    todoItem.remove();
    getToDoCount();
  });
}

function complitedTodo() {
  this.parentElement.classList.toggle('item--completed');
  getToDoCount();
}

function todoAction() {
  const todoItemsList = document.querySelectorAll('.item');

  todoItemsList.forEach((item) => {
    const completedButton = item.querySelector('.js_complited');
    const trashButton = item.querySelector('.js_trash');

    completedButton.addEventListener('click', complitedTodo);

    trashButton.addEventListener('click', deleteTodo);
  });
}

function removeComlitedItems() {
  const complitedItemsList = document.querySelectorAll('.item--completed');

  if (!complitedItemsList.length) {
    return;
  }

  for (const item of complitedItemsList) {
    item.remove();
  }
}

function chooseActiveTab() {
  const footerJsBtnsList = document.querySelectorAll('.footer__js-btn');

  for (const footerBtn of footerJsBtnsList) {
    footerBtn.addEventListener('click', function () {
      for (const footerBtn of footerJsBtnsList) {
        footerBtn.classList.remove('active');
      }

      footerBtn.classList.add('active');
      let footerBtnId = footerBtn.getAttribute('id');

      getActiveTabItems(footerBtnId);
    });
  }
}

function getActiveTabItems(id = 'all') {
  const todoItemsList = document.querySelectorAll('.item');

  todoItemsList.forEach(function (todoItem) {
    switch (id) {
      case 'active':
        if (todoItem.classList.contains('item--completed')) {
          todoItem.style.display = 'none';
        } else {
          todoItem.style.display = 'block';
        }
        break;
      case 'complited':
        if (todoItem.classList.contains('item--completed')) {
          todoItem.style.display = 'block';
        } else {
          todoItem.style.display = 'none';
        }
        break;
      default:
        todoItem.style.display = 'block';
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
