//

import { Arguments } from "yargs";

//

export type AddArguments = Arguments<Options>;
export type Aliases = "a";

export interface Options {
  message: string;
}
