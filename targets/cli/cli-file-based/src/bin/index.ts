//

import { Database } from "@todolist.databases/lowdb";
import { Todo } from "@todolist/core";
import { Container, inject, injectable } from "inversify";
import FileSync from "lowdb/adapters/FileSync";
import complement from "ramda/es/complement";
import cond from "ramda/es/cond";
import filter from "ramda/es/filter";
import includes from "ramda/es/includes";
import map from "ramda/es/map";
import pickBy from "ramda/es/pickBy";
import pipe from "ramda/es/pipe";
import unless from "ramda/es/unless";
import when from "ramda/es/when";
import * as listCmd from "src/commands/list";
import { todolistCli } from "src/core/cli";
import { ListOptions } from "src/core/list";
import { Arguments } from "yargs";

//

const filterUncompletedTodo = filter<Todo, "array">(todo => !todo.completed);
const filterMetaData = pickBy(
  includes<Array<keyof Todo>>(["completed", "id", "title"])
);

const dataFilterFn = (options: { all: boolean; long: boolean }) =>
  pipe(
    unless(() => options.all, filterUncompletedTodo),
    unless(() => options.long, map<Todo, Todo>(filterMetaData))
  );

export function main(rawArgs: string[]): object {
  return todolistCli()
    .command({
      ...listCmd,
      handler(args: listCmd.ListArguments): void {
        const databases = new Database(
          new FileSync(process.env.TODOLIST_DB || "./todo.json")
        );

        const listFrom = dataFilterFn(args);

        listFrom(databases.getTodos());
      }
    })
    .parse(rawArgs);
}

//

function bootstrap(args: Arguments<{}>): Container {
  return new Container();
}
