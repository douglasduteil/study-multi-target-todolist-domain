//

import { TodoDataSource } from "@todolist/core";
import { Argv, CommandModule } from "yargs";
import { AddArguments, Aliases } from "./types";

//

export class AddCommand implements CommandModule<Argv<{}>, AddArguments> {
  public command = "add <message>";
  public describe = "Add a todo";
  public aliases: ReadonlyArray<Aliases> = ["a"];
  constructor(private todoDataSource: TodoDataSource) {}

  // ? NOTE(douglasduteil): `handler` is assigned here to preserve the `this`
  // ? `yargs` seems to call the handlers with forced `.bind(undefined, [...])`
  public handler = (args: AddArguments) => {
    this.todoDataSource.addTodo({
      completed: false,
      createdAt: new Date(0),
      id: "",
      title: args.message,
      updatedAt: new Date(0)
    });
  };
}
