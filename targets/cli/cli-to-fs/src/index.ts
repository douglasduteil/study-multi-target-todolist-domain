//

import { Database } from "@todolist.databases/lowdb";
import { commands, main } from "@todolist.ui/yargs";
import { Container, inject, injectable } from "inversify";
import "reflect-metadata";
import { Argv } from "yargs";
import { version } from "../package.json";
import { ListCommand } from "./commands/list";

//

export function cli(adapter?: any): Argv {
  const container = new Container();
  container.bind("DAL").to(DAL);
  container.bind("LOWDB_ADAPTER").toConstantValue(adapter);
 
  container.bind("ListCommand").to(ListCommand);

  return main({ version }).command(container.get("ListCommand"));
}

export function cli2(adapter?: any): Argv {
  const container = new Container();
  container.bind("DAL").to(DAL);
  container.bind("LOWDB_ADAPTER").toConstantValue(adapter);

  const root = main({ version });

  const cmd = commands.list;
  const superHandler = cmd.handler;

  root.command({
    ...cmd,
    handler(args: any): void {
      const options = superHandler(args);

      const dal = container.get<DAL>("DAL");
      console.log(options, dal.todoDB.getTodos());
    }
  });

  return root;
}

//

@injectable()
class DAL {
  public todoDB = new Database(this.adapter);
  constructor(@inject("LOWDB_ADAPTER") private adapter: any) {}
}
