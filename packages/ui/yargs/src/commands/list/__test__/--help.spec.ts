//

import yargs from "yargs";
import * as command from "..";

//

test("should display help", () => {
  const log = jest.fn();
  yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["list", "--help"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatchInlineSnapshot(`
"test list

List todos

List Options:
  --all, -a   Show done todos that are normally hidden[boolean] [default: false]
  --json      Show information as a JSON array        [boolean] [default: false]
  --long, -l  Show extended information               [boolean] [default: false]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]"
`);
});
