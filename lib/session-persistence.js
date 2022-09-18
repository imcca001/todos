const SeedData = require("./seed-data");
const deepCopy = require("./deep-copy");
const nextId = require("./next-id");

const { sortTodoLists, sortTodos } = require("./sort");

module.exports = class SessionPersistence {
  constructor(session) {
    this._todoLists = session.todoLists || deepCopy(SeedData);
    session.todoLists = this._todoLists;
  }

  isUniqueConstraintViolation(_error) {
    return false;
  }

  isDoneTodoList(todoList) {
    return todoList.todos.length > 0 && todoList.todos.every(todo => todo.done);
  }

  sortedTodoLists() {
    let todoLists = deepCopy(this._todoLists);
    let undone = todoLists.filter(todoList => !this.isDoneTodoList(todoList));
    let done = todoLists.filter(todoList => this.isDoneTodoList(todoList));
    return sortTodoLists(undone, done);
  }

  sortedTodos(todoList) {
    let undone = todoList.todos.filter(todo => !todo.done);
    let done = todoList.todos.filter(todo => todo.done);
    return deepCopy(sortTodos(undone, done));
  }

  toggleDoneTodo(todoListId, todoId) {
    let todo = this._findTodo(todoListId, todoId);
    if (!todo) return false;

    todo.done = !todo.done;
    return true;
  }

  loadTodoList(todoListId) {
    let todoList = this._findTodoList(todoListId);
    return deepCopy(todoList);
  }

  loadTodo(todoListId, todoId) {
    let todo = this._findTodo(todoListId, todoId);
    return deepCopy(todo);
  }

  deleteTodo(todoListId, todoId) {
    let todoList = this._findTodoList(todoListId);
    let todo = this._findTodo(todoListId, todoId);
    if (!todo) return false;

    todoList.todos = todoList.todos.filter(todo => todo.id !== todoId);
    return true;
  }

  deleteTodoList(todoListId) {
    let todoLists = this._todoLists;
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    let index = todoLists.indexOf(todoList);
    todoLists = todoLists.splice(index, 1);
    return true;
  }

  markAllDone(todoListId) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    todoList.todos.forEach(todo => (todo.done = true));
    return true;
  }

  addTodo(todoListId, title) {
    let todoList = this._findTodoList(todoListId);
    if (!todoList) return false;

    todoList.todos.push({
      title,
      id: nextId(),
      done: false,
    });
    
    return true;
  }

  hasUndoneTodos(todoList) {
    return todoList.todos.some(todo => !todo.done);
  }

  setTitle(todoListId, title) {
    let todoList = this._findTodoList(todoListId);
    todoList.title = title;
  }

  existsTodoListTitle(title) {
    return this._todoLists.some(todoList => todoList.title === title);
  }

  createList(title) {
    let todoList = {
      id: nextId(),
      title: title,
      todos: [],
    }
    this._todoLists.push(todoList);
  }

  _findTodoList(todoListId) {
    return this._todoLists.find(todoList => todoList.id === todoListId);
  }

  _findTodo(todoListId, todoId) {
    let todoList = this._findTodoList(todoListId);
    if(!todoList) return undefined;

    return todoList.todos.find(todo => todo.id === todoId);
  }
};