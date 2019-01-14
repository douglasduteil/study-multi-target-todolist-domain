//

import { TodoDataSource } from "@todolist/core";
import yargs from "yargs";
import { AddCommand } from "..";

//

const command = new AddCommand(({} as any) as TodoDataSource);

//

test("should display help", () => {
  const parseFn = jest.fn();
  yargs
    .usage("foo add <options>")
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["add", "--help"], parseFn);
  const [[error, , output]] = parseFn.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatchInlineSnapshot(`
"test add <message>

Add a todo

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]"
`);
});
