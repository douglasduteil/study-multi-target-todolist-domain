//

import uuid from "uuid/v4";

import { Todo } from "@todolist/core";
import { TodoInMemory } from "src/models/todo";
import { database } from "./database";

export async function getTodos(): Promise<sTodoInMemory[]> {
  return database.todos;
}

export async function addTodo(newTodo: Todo): Promise<TodoInMemory> {
  const todo: TodoInMemory = { id: uuid(), ...newTodo };
  database.todos.push(todo);
  return todo;
}

export async function removeTodo(id: string): Promise<TodoInMemory> {
  const removedTodoIndex = database.todos.findIndex(todo => todo.id === id);
  const removedTodo = database.todos[removedTodoIndex];
  database.todos.splice(removedTodoIndex, 1);
  return removedTodo;
}

export async function findTodo(todoId: string): Promise<TodoInMemory> {
  const foundTodo = database.todos.find(todo => todo.id === todoId);
  return foundTodo ? foundTodo : Promise.reject(`todo@${todoId} not found`);
}

export async function updateTodo(
  todoId: string,
  newTodo: Partial<Todo>
): Promise<TodoInMemory> {
  const todoIndex = database.todos.findIndex(todo => todo.id === todoId);
  database.todos[todoIndex] = {
    ...database.todos[todoIndex],
    ...newTodo
  };
  return database.todos[todoIndex];
}
