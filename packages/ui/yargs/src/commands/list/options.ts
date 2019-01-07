//

import { Options } from "yargs";
import { Aliases, ListOptions } from "./types";

//

export const group = "List Options:";
export const ALIASES_DEFAULT_OPTIONS: {
  [key in Aliases]: Partial<ListOptions>
} = {
  la: { all: true },
  ll: { long: true },
  ls: {}
};

export const options: { [key in keyof ListOptions]: Options } = {
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
