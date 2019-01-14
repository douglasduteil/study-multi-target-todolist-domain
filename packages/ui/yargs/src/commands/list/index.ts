//

import { TodoDataSource, TodoListFilterFn } from "@todolist/core";
import pipe from "ramda/es/pipe";
import { Argv, CommandModule } from "yargs";
import { jsonView, listView } from "../../views";
import { group, options } from "./options";
import { Aliases, ListArguments } from "./types";
import { mapAliasOnOptions } from "./utils";

//

export class ListCommand implements CommandModule<Argv<{}>, ListArguments> {
  public command = "list [options]";
  public describe = "List todos";
  public aliases: ReadonlyArray<Aliases> = ["ls", "la", "ll"];
  constructor(
    private todolistFilterFn: TodoListFilterFn,
    private logger: Console,
    private todoDataSource: TodoDataSource
  ) {}

  // HACK(douglasduteil): CommandBuilder<any, any> ...
  // I didn't find how to make tsc happy without any-s here...
  public builder(yargs: Argv<{}>): Argv<any> {
    return yargs.options(options).group(Object.keys(options), group);
  }

  // ? NOTE(douglasduteil): `handler` is assigned here to preserve the `this`
  // ? `yargs` seems to call the handlers with forced `.bind(undefined, [...])`
  public handler = async (args: ListArguments) => {
    const opts = mapAliasOnOptions(args);

    const transform = this.todolistFilterFn(opts);

    const render = pipe(
      args.json ? jsonView : listView,
      this.logger.log
    );

    pipe(
      transform,
      render
    )(await this.todoDataSource.getTodos());
  };
}
