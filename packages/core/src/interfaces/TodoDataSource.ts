//

import { Todo } from "../models/todo";

//

export interface TodoDataSource {
  addTodo(todo: Todo): Todo;
  getTodos(): Todo[];
}
