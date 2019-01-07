//

import pipe from "ramda/es/pipe";
import { Argv } from "yargs";
import { group, options } from "./options";
import { Aliases, ListArguments } from "./types";
import { mapAliasOnOptions } from "./utils";

//

export class ListCommand {
  public aliases: ReadonlyArray<Aliases> = ["ls", "la", "ll"];
  public command = "list [options]";
  public describe = "List todos";
  public preHandler = pipe(mapAliasOnOptions);
  public builder<T>(yargs: Argv<T>): Argv<any> {
    return yargs.options(options).group(Object.keys(options), group);
  }
}

//

export const aliases: ReadonlyArray<Aliases> = ["ls", "la", "ll"];
export const command = "list";
export const describe = "List todos";

// HACK(douglasduteil): CommandBuilder<any, any> ...
// I didn't find how to make tsc happy without any-s here...
// tslint:disable-next-line:typedef
export function builder<T>(yargs: Argv<T>): Argv<any> {
  return yargs.options(options).group(Object.keys(options), group);
}

export const handler: (args: ListArguments) => ListArguments = pipe(
  mapAliasOnOptions
);
