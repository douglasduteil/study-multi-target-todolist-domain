//

import { testCli as cli } from ".";

//

test("should display help", () => {
  const log = jest.fn();
  cli()
    .scriptName("test")
    .wrap(80)
    .parse(["--help"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatchInlineSnapshot(`
"Usage: test <command> [options]

Commands:
  test list  List todos                                    [aliases: ls, la, ll]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]"
`);
});

test.skip("should display main help", () => {
  const log = jest.fn();
  cli()
    .scriptName("test")
    .wrap(80)
    .parse([], log);
  const [[error, , output]] = log.mock.calls;
  expect(error.message).toMatchInlineSnapshot(
    `"A command is required. Pass --help to see all available commands and options."`
  );
  expect(output).toMatchInlineSnapshot(`
"Usage: test <command> [options]

Commands:
  test list  List todos                                    [aliases: ls, la, ll]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

A command is required. Pass --help to see all available commands and options."
`);
});
