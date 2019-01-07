//

import { pipe } from "ramda";
import { Arguments, Argv, Options } from "yargs";
import { ListOptions } from "../core/list";

//

export const aliases: ReadonlyArray<Aliases> = ["ls", "la", "ll"];
export const command = "list";
export const describe = "List todos";

// HACK(douglasduteil): CommandBuilder<any, any> ...
// I didn't find how to make tsc happy without any-s here...
// tslint:disable-next-line:typedef
export function builder<T>(yargs: Argv<T>): Argv<any> {
  return yargs.options(yargsOptions).group(Object.keys(yargsOptions), group);
}

export const handler: (args: ListArguments) => void = pipe(mapAliasOnOptions);

//

export type ListArguments = Arguments<{ [key in keyof ListOptions]: boolean }>;
export type Aliases = "ls" | "la" | "ll";

//

export const group = "List Options:";
export const ALIASES_DEFAULT_OPTIONS: {
  [key in Aliases]: Partial<ListOptions>
} = {
  la: { all: true },
  ll: { long: true },
  ls: {}
};

export const yargsOptions: { [key in keyof ListOptions]: Options } = {
  all: {
    alias: "a",
    default: false,
    describe: "Show done todos that are normally hidden",
    type: "boolean"
  },
  json: {
    default: false,
    describe: "Show information as a JSON array",
    type: "boolean"
  },
  long: {
    alias: "l",
    default: false,
    describe: "Show extended information",
    type: "boolean"
  }
};

//

export function mapAliasOnOptions(argv: ListArguments): ListArguments {
  const alias = argv._[0] as Aliases;
  const options = ALIASES_DEFAULT_OPTIONS[alias];
  return { ...argv, ...options };
}
