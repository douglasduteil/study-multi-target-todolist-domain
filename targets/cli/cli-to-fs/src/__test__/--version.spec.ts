//

import { testCli as cli } from ".";

//

test("should display version", () => {
  const log = jest.fn();
  cli()
    .scriptName("test")
    .wrap(80)
    .parse(["--version"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeUndefined();
  expect(output).toMatch(/^\d+\.\d+\.\d+$/);
});
