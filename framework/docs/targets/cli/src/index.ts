//

import { main } from "@douglasduteil/framework.docs.commands";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const { version } = JSON.parse(
  readFileSync(
    join(fileURLToPath(import.meta.url), "../../package.json"),
    "utf-8"
  )
);

main({ version }, process.argv).parse();
