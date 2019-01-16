//

import { NewTodo, Todo } from "../models";

//

export interface TodoDataSource {
  addTodo(todo: NewTodo): Promise<Todo>;
  getTodos(): Promise<ReadonlyArray<Todo>>;
}
