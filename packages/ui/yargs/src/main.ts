//

import yargs from "yargs";

export function main({ version }: { version: string }): yargs.Argv {
  return yargs
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
