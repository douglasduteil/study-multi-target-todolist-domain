//

import { NewTodo, Todo, TodoDataSource } from "@todolist/core";
import low from "lowdb";
import { NotFoundError } from "./errors";
import { LowDbShema } from "./models";

//

export class Database implements TodoDataSource {
  db: low.LowdbSync<LowDbShema>;
  constructor(
    adapter: low.AdapterSync<LowDbShema> | low.AdapterAsync<LowDbShema>
  ) {
    this.db = low(adapter);
    this.db.defaults({ index: 0, todos: [] }).write();
  }
  async getTodos(): Promise<ReadonlyArray<Todo>> {
    return this.db.get("todos").value();
  }

  getTodo(id: string): Todo {
    const todo = this.db
      .get("todos")
      .find({ id })
      .value();

    if (!todo) {
      throw new NotFoundError(`Can't find todo ${id}`);
    }

    return todo;
  }

  async addTodo(todo: NewTodo): Promise<Todo> {
    const index = this.db.get("index").value();
    this.db.set("index", index + 1).write();

    const newTodo: Todo = {
      ...todo,
      completed: false,
      createdAt: new Date(Date.now()),
      id: String(index),
      updatedAt: new Date(Date.now())
    };

    this.db
      .get("todos")
      .push(newTodo)
      .write();

    return newTodo;
  }

  updateTodo(id: string, todo: Partial<Todo>): Todo {
    const actual = this.getTodo(id);
    const completedValues: Partial<Todo> =
      !actual.completed && todo.completed
        ? {
            completed: true, // as the new todo is completed indeed
            completedAt: new Date(Date.now())
          }
        : {
            completedAt: undefined // force undefined to lock the value
          };
    const lockedValues: Partial<Todo> = {
      createdAt: actual.createdAt,
      id: actual.id
    };
    const newTodo: Todo = {
      ...actual,
      ...todo,
      ...completedValues,
      updatedAt: new Date(Date.now()),
      ...lockedValues
    };

    this.db
      .get("todos")
      .find({ id })
      .assign(newTodo)
      .write();

    return newTodo;
  }

  removeTodo(id: string): Todo {
    const actual = this.getTodo(id);

    this.db
      .get("todos")
      .remove({ id })
      .write();

    return actual;
  }
}
