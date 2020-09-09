'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoContainer) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoContainer = document.querySelector(todoContainer);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    let todoEdit = '';
    li.classList.add('todo-item');
    li.key = todo.key;
    li.dataset.key = todo.key; // атрибут data-key в элемент li с значением ключа
    // console.log(todo.key);



    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `);
    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = '';
    } else {
      alert('Введите задачу');
    }


  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(key) {
    this.todoData.delete(key);
    this.render();
  }

  editItem(targetKey, text) {
    this.todoData.forEach((data, key) => {
      if (targetKey === key) {

        // console.log(data.value, text);
        console.log(data);
        data.value = text.trim();

      }
      // console.log(targetKey);
    });
    this.render();
  }

  completedItem(targetKey) {
    this.todoData.forEach((value, key) => {
      if (targetKey === key && value.completed === false) {
        value.completed = true;
      } else if (targetKey === key && value.completed === true) {
        value.completed = false;
      }
    });

    this.render();
  }

  handler() {

    this.todoContainer.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      if (target.matches('.todo-complete')) {
        target.key = target.closest('.todo-item').key;
        this.completedItem(target.key);
      } else if (target.matches('.todo-remove')) {
        target.key = target.closest('.todo-item').key;
        this.deleteItem(target.key);
      } else if (target.matches('.todo-edit')) {
        target.key = target.closest('.todo-item').key;
        let textEdit = target.closest('.todo-item');
        let textSpan = textEdit.querySelector('.text-todo');

        textSpan.setAttribute('contenteditable', true);
        console.log(textSpan.textContent.length);
        textSpan.focus();
        if (textSpan.getAttribute('contenteditable')) {
          textEdit.addEventListener('dblclick', (evet) => {
            let text = '';
            text = event.target.closest('.todo-item').textContent;
            textSpan.setAttribute('contenteditable', false);
            textSpan.blur();
            this.editItem(target.key, text);

          });
        }
      }
    });

  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
todo.handler();