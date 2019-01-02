//

import { todolistCli } from "src/core/cli";

//

export function main(args: string[]): object {
  return todolistCli().parse(args);
}
