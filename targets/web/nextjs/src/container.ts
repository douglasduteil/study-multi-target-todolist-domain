//

import { filterTodosFn } from "@todolist/core";
import { IDENTIFIER as UI_IDENTIFIER } from "@todolist/ui.nextjs";
import { Container } from "inversify";
import LowdbLocalStorageAdapter from "lowdb/adapters/LocalStorage";
import { LowDbDataSource } from "src/dal";
import { IDENTIFIER } from "./identifiers";

//

export const container = new Container();

//

container.bind(UI_IDENTIFIER.CORE_FILTER).toConstantValue(filterTodosFn);
container.bind(UI_IDENTIFIER.DATA_SOURCE).to(LowDbDataSource);
container
  .bind(IDENTIFIER.LOWDB_ADAPTER)
  .toConstantValue(new LowdbLocalStorageAdapter("db"));
