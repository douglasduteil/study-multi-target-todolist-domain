//

import { inject, postConstruct } from "inversify";
import { Config } from "./config";
import { CONFIG_TOKEN } from "./tokens";

//

export class Database {
  constructor(@inject(CONFIG_TOKEN) private config: Config) {}

  @postConstruct()
  public initialize(): void {
    console.log(`check file ${this.config.path}/${this.config.filename}`);
  }
}
