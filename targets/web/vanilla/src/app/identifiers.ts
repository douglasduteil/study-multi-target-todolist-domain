//

const prefix = "@todolist/target/web/vanilla";

//

export const IDENTIFIER = {
  DATA_SOURCE: Symbol.for(`${prefix}#DATA_SOURCE`),
  LOWDB_ADAPTER: Symbol.for(`${prefix}#LOWDB_ADAPTER`),
  ROOT_COMPONENT: Symbol.for(`${prefix}#ROOT_COMPONENT`),
  ROOT_ELEMENT: Symbol.for(`${prefix}#ROOT_ELEMENT`)
};
