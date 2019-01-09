//

import { Database } from "@todolist/databases.lowdb";
import { decorate, inject, injectable } from "inversify";
import { IDENTIFIER } from "./identifiers";

decorate(injectable(), Database);
decorate(inject(IDENTIFIER.LOWDB_ADAPTER) as ParameterDecorator, Database, 0);

@injectable()
export class LowDbDataSource extends Database {}
