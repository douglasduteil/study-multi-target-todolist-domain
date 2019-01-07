//

import { Arguments } from "yargs";

//

export type ListArguments = Arguments<{ [key in keyof ListOptions]: boolean }>;
export type Aliases = "ls" | "la" | "ll";

export interface ListOptions {
  all: boolean;
  // XXX(douglasduteil): Move json out of here
  // json should be part of the "list" filter as it's format
  json: boolean;
  long: boolean;
}
