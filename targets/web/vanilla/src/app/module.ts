//

import { ContainerModule, interfaces } from "inversify";
import LowdbLocalStorageAdapter from "lowdb/adapters/LocalStorage";
import { filterTodosFn } from "@todolist/core";
import { App } from "./app";
import { LowDbDataSource } from "./dal";
import { IDENTIFIER } from "./identifiers";

//

// ? Could skipped if both ui and data binding are separate ContainerModule
export const AppModule = new ContainerModule(bind => {
  dataBinding(bind);
  coreBinding(bind);
  appBinding(bind);
});

//

// ? Could be in a separate ContainerModule
const appBinding = (bind: interfaces.Bind) => {
  bind(IDENTIFIER.ROOT_ELEMENT).toConstantValue(
    document.getElementById("root")! // ! MUST be there...
  );
  bind(IDENTIFIER.ROOT_COMPONENT).to(App);
};

// ? Could be in a separate ContainerModule
const coreBinding = (bind: interfaces.Bind) => {
  bind(IDENTIFIER.CORE_FILTER).toConstantValue(filterTodosFn);
};

// ? Could be in a separate ContainerModule
const dataBinding = (bind: interfaces.Bind) => {
  bind(IDENTIFIER.DATA_SOURCE).to(LowDbDataSource);
  bind(IDENTIFIER.LOWDB_ADAPTER).toConstantValue(
    new LowdbLocalStorageAdapter("db")
  );
};
