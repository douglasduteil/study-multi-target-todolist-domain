//

import { ListCommand as InternalListCommand } from "@todolist.ui/yargs/lib/commands/list";
import { Todo } from "@todolist/core";
import { decorate, inject, injectable } from "inversify";
import filter from "ramda/es/filter";
import includes from "ramda/es/includes";
import map from "ramda/es/map";
import pickBy from "ramda/es/pickBy";
import pipe from "ramda/es/pipe";
import unless from "ramda/es/unless";

//

decorate(injectable(), InternalListCommand);

//

@injectable()
export class ListCommand extends InternalListCommand {
  constructor(@inject("DAL") private dal: any) {
    super();
  }

  public handler(args: any): void {
    console.log(this);
    const { all, long } = this.preHandler(args);
    const rawData = this.dal.todoDB.getTodos();

    const listFrom = dataFilterFn({ all, long });

    const data = listFrom(rawData);

    console.log(data);
  }
}

const filterUncompletedTodo = filter<Todo, "array">(todo => !todo.completed);
const filterMetaData = pickBy(
  includes<Array<keyof Todo>>(["completed", "id", "title"])
);

const dataFilterFn = (options: { all: boolean; long: boolean }) =>
  pipe(
    unless(() => options.all, filterUncompletedTodo),
    unless(() => options.long, map<Todo, Todo>(filterMetaData))
  );
