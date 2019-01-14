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
  getTodos(): Todo[] {
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

  addTodo(todo: NewTodo): Todo {
    const index = this.db.get("index").value();
    this.db.set("index", index + 1).write();

    const newTodo: Todo = {
      ...todo,
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

  updateTodo(id: string, todo: Partial<NewTodo>): Todo {
    const actual = this.getTodo(id);
    const lockedValues = { createdAt: actual.createdAt, id: actual.id };
    const newTodo: Todo = {
      ...actual,
      ...todo,
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
