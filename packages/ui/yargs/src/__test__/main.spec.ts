//

import { main } from "../main";

//

test("should display main help", () => {
  const parseFn = jest.fn();
  main({ version: "x.y.z" })
    .scriptName("test")
    .wrap(80)
    .parse([], parseFn);
  const [[error, , output]] = parseFn.mock.calls;
  expect(error.message).toMatchInlineSnapshot(
    `"A command is required. Pass --help to see all available commands and options."`
  );
  expect(output).toMatchSnapshot();
});

test("should display version", () => {
  const parseFn = jest.fn();
  main({ version: "x.y.z" })
    .scriptName("test")
    .wrap(80)
    .parse(["--version"], parseFn);
  const [[error, , output]] = parseFn.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatchInlineSnapshot(`"x.y.z"`);
});
