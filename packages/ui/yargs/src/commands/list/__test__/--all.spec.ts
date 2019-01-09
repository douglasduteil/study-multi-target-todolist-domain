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
    .parse(["list", "--all"], log);
  const [[error, parsed]] = log.mock.calls;
  expect(error).toBeNull();
  expect(parsed).toMatchInlineSnapshot(`
Object {
  "$0": "test",
  "_": Array [
    "list",
  ],
  "a": true,
  "all": true,
  "json": false,
  "l": false,
  "long": false,
}
`);
});
