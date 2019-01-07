//

import { main } from "../main";

//

test("should display main help", () => {
  const log = jest.fn();
  main({ version: "x.y.z" })
    .scriptName("test")
    .wrap(80)
    .parse([], log);
  const [[error, , output]] = log.mock.calls;
  expect(error.message).toMatchInlineSnapshot(
    `"A command is required. Pass --help to see all available commands and options."`
  );
  expect(output).toMatchSnapshot();
});

test("should display version", () => {
  const log = jest.fn();
  main({ version: "x.y.z" })
    .scriptName("test")
    .wrap(80)
    .parse(["--version"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatchInlineSnapshot(`"x.y.z"`);
});
