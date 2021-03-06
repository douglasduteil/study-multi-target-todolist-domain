//

import filter from "ramda/es/filter";
import map from "ramda/es/map";
import pick from "ramda/es/pick";
import pipe from "ramda/es/pipe";
import unless from "ramda/es/unless";
import { Todo, TodoWithoutMeta } from "../models";

//

const filterUncompletedTodo = filter<Todo, "array">(todo => !todo.completed);
const filterMetaData = pick(["completed", "id", "title"]);

//

export type TodoListFilterFn = typeof filterTodosFn;
export interface TodoListFilterOptions {
  all: boolean;
  long: boolean;
}
export const filterTodosFn = (options: TodoListFilterOptions) =>
  pipe(
    unless(() => options.all, filterUncompletedTodo),
    unless(() => options.long, map<Todo, TodoWithoutMeta>(filterMetaData))
  );
