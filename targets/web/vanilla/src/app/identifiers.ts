//

const prefix = "@todolist/target/web/vanilla";

//

export const IDENTIFIER = {
  CORE_FILTER: Symbol.for(`${prefix}#CORE_FILTER`),
  DATA_SOURCE: Symbol.for(`${prefix}#DATA_SOURCE`),
  LOWDB_ADAPTER: Symbol.for(`${prefix}#LOWDB_ADAPTER`),
  ROOT_COMPONENT: Symbol.for(`${prefix}#ROOT_COMPONENT`),
  ROOT_ELEMENT: Symbol.for(`${prefix}#ROOT_ELEMENT`)
};
