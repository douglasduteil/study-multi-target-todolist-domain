//

import { Todo } from "@todolist/core";

//

export function jsonView(todos: Todo[]): string {
  return JSON.stringify(todos);
}
