//

import LowMemoryAdapter from "lowdb/adapters/Memory";
import { Argv } from "yargs";
import { cli } from "../index";

//

export function testCli(): Argv {
  return cli(new LowMemoryAdapter("foo"));
}
