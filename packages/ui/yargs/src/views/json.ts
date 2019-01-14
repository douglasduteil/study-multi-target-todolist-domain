//

import { Todo } from "@todolist/core";
import { TodoWithoutMeta } from "../interfaces";

//

export function jsonView(todos: ReadonlyArray<Todo | TodoWithoutMeta>): string {
  return JSON.stringify(todos);
}
