//

import yargs from "yargs";
import { version } from "../../package.json";

export function todolistCli(): yargs.Argv {
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
