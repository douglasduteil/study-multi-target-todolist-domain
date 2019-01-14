//

import { filterTodosFn } from "@todolist/core";
import { Database } from "@todolist/databases.lowdb";
import { commands, main } from "@todolist/ui.yargs";
import LowdbFileSyncStorageAdapter from "lowdb/adapters/FileSync";
import { version } from "../package.json";

//

const lowDbDataSource = new Database(
  new LowdbFileSyncStorageAdapter("db.json")
);

const { AddCommand, ListCommand } = commands;

main({ version })
  .command(new AddCommand(lowDbDataSource))
  .command(new ListCommand(filterTodosFn, console, lowDbDataSource))
  .parse(process.argv.slice(2));
