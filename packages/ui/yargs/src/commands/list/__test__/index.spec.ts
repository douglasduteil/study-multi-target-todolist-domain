//

import yargs from "yargs";
import { command, dataSource, logger } from "./_fake";

//

afterEach(() => {
  dataSource.getTodos.mockReset();
});

//

test("'list' should list uncompleted todos", async () => {
  const parseFn = jest.fn();

  await yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["list"], parseFn);

  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.getTodos).toHaveBeenCalled();
  const [[output]] = logger.log.mock.calls;
  expect(output).toMatchInlineSnapshot(`
"(1) ☐ Omelette
(2) ☐ Chocolate
(5) ☐ Butter"
`);
});
