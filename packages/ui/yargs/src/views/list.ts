//

import { Todo } from "@todolist/core";
import dedent from "dedent";
import ago from "s-ago";
import { TodoWithoutMeta } from "../interfaces";

//

export function listView(todos: ReadonlyArray<Todo | TodoWithoutMeta>): string {
  return todos
    .map(template)
    .reduce((view, line) => `${view}\n${line}`, "")
    .trim();
}

//

function isTodo(todo: Todo | TodoWithoutMeta): todo is Todo {
  return Boolean((todo as Todo).createdAt);
}

function template(todo: Todo | TodoWithoutMeta): string {
  return dedent`
    ${idSymbol(todo.id)} ${completeSymbol(todo.completed)} ${todo.title} ${
    isTodo(todo) ? metaInfo(todo) : ""
  }
  `.trim();
}

function idSymbol(id?: string): string {
  return `(${id})`;
}

function completeSymbol(complete?: boolean): string {
  return complete ? "☒" : "☐";
}

function metaInfo(todo: Todo): string {
  return (
    "\n  " +
    dedent`
      Created ${ago(todo.createdAt)}
    `.trim()
  );
}
