//

import execa from "execa";
import { copy } from "fs-extra";
import path from "path";

//

export const CLI = path.join(__dirname, "../dist/index.js");
export const FIXTURES_FOLDER = path.join(__dirname, "__fixtures__");

//

export function bin(
  cwd: string
): (...args: string[]) => Promise<execa.ExecaReturns> {
  return async (...args: string[]): Promise<execa.ExecaReturns> =>
    execa("node", [CLI, ...args], { cwd });
}

// tslint:disable-next-line:typedef
export function copyFixture(name: string) {
  return (destination: string) =>
    copy(path.join(FIXTURES_FOLDER, name), destination);
}
