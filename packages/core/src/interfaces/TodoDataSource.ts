//

import { NewTodo, Todo } from "../models/todo";

//

export interface TodoDataSource {
  addTodo(todo: NewTodo): Todo;
  getTodos(): ReadonlyArray<Todo>;
}
