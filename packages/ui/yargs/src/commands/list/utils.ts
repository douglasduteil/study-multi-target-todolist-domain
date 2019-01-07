//

import { ALIASES_DEFAULT_OPTIONS } from "./options";
import { Aliases, ListArguments } from "./types";

//

export function mapAliasOnOptions(argv: ListArguments): ListArguments {
  const alias = argv._[0] as Aliases;
  const options = ALIASES_DEFAULT_OPTIONS[alias];
  return { ...argv, ...options };
}
