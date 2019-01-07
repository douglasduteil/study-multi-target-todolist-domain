//

import { Arguments, Argv, Options } from "yargs";

//

export const aliases: ReadonlyArray<"a"> = ["a"];
export const command = "add";
export const describe = "Add todo";

// HACK(douglasduteil): CommandBuilder<any, any> ...
// I didn't find how to make tsc happy without any-s here...
// tslint:disable-next-line:typedef
export function builder<T>(yargs: Argv<T>): Argv<any> {
  return yargs.options(yargsOptions).group(Object.keys(yargsOptions), group);
}

//

export interface AddOptions {
  done: boolean;
}

export type AddArguments = Arguments<AddOptions>;

//

export const group = "Add Options";
export const yargsOptions: { [key in keyof AddOptions]: Options } = {
  done: {
    default: false,
    describe: "Show private packages that are normally hidden",
    type: "boolean"
  }
};

//
