//

export interface FilterOptions {
  all: boolean;
  // XXX(douglasduteil): Move json out of here
  // json should be part of the "list" filter as it's format
  json: boolean;
  long: boolean;
}
