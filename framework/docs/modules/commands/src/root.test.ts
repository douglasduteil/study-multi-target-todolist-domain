//
//

import { expect, jest, test } from "@jest/globals";
import { main } from "./root";

//

test("should display help", () => {
  const parseFn = jest.fn();

  main({ version: "x.y.z" })
    .scriptName("my-test")
    .wrap(80)
    .parse(["add", "--help"], parseFn);

  const [[error, , output]] = parseFn.mock.calls;
  expect(error).toBeUndefined()
  expect(output).toMatchInlineSnapshot(`
    "Usage: my-test <command> [options]

    Options:
      -h, --help     Show help                                             [boolean]
      -v, --version  Show version number                                   [boolean]"
  `)
})
