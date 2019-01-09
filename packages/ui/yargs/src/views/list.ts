//

import { Todo } from "@todolist/core";

//

export function listView(todos: Todo[]): string {
  return todos
    .map(todo => `- ${todo.title}`)
    .reduce((view, line) => `${view}\n${line}`, "")
    .trim();
}
