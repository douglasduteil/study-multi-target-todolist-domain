//

import { TodoDataSource } from "@todolist/core";
import { Argv, CommandModule } from "yargs";
import { AddArguments, Aliases } from "./types";

//

export class AddCommand implements CommandModule<Argv<{}>, AddArguments> {
  command = "add <message>";
  describe = "Add a todo";
  aliases: ReadonlyArray<Aliases> = ["a"];
  constructor(private todoDataSource: TodoDataSource) {}

  // ? NOTE(douglasduteil): `handler` is assigned here to preserve the `this`
  // ? `yargs` seems to call the handlers with forced `.bind(undefined, [...])`
  handler = (args: AddArguments) => {
    this.todoDataSource.addTodo({
      completed: false,
      title: args.message
    });
  };
}
