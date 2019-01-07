//

import tempy from "tempy";

import { bin } from "..";

//

test("'--version' should print todolist version", async () => {
  const cwd = tempy.directory();

  const { stdout } = await bin(cwd)("--version");
  expect(stdout).toMatch(/^\d+\.\d+\.\d+$/);
});

test("'--help' should print todolist help", async () => {
  const cwd = tempy.directory();

  const { stdout } = await bin(cwd)("--help");
  expect(stdout).toMatchSnapshot();
});
