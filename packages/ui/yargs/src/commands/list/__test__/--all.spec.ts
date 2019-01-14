//

import yargs from "yargs";
import { command, dataSource, logger } from "./_fake";

//

afterEach(() => {
  dataSource.getTodos.mockReset();
});

//

test("'list --all' should display all todos", async () => {
  const parseFn = jest.fn();

  await yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["list", "--all"], parseFn);

  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.getTodos).toHaveBeenCalled();
  const [[output]] = logger.log.mock.calls;
  expect(output).toMatchInlineSnapshot(`
"(1) ☐ Omelette
(2) ☐ Chocolate
(3) ☒ Milk
(4) ☒ Bread
(5) ☐ Butter"
`);
});
