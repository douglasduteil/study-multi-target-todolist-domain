//

import type { Argv } from "yargs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function main(
  { version }: { version: string },
  argv: string[] = process.argv
): Argv {
  return yargs(hideBin(argv))
    .usage("Usage: $0 <command> [options]")
    .version(version)
    .demandCommand(
      1,
      "A command is required. Pass --help to see all available commands and options."
    )
    .recommendCommands()
    .strict()
    .alias("h", "help")
    .alias("v", "version");
}
