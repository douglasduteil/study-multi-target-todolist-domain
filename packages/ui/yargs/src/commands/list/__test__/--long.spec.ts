//

import yargs from "yargs";
import { command, dataSource, logger } from "./_fake";

//

afterEach(() => {
  dataSource.getTodos.mockReset();
});

//

test("'list --long' should display uncompleted todos with extra info", async () => {
  const parseFn = jest.fn();

  await yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["list", "--long"], parseFn);

  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.getTodos).toHaveBeenCalled();
  const [[output]] = logger.log.mock.calls;
  expect(output).toMatchInlineSnapshot(`
"(1) ☐ Omelette 
Created 49 years ago
(2) ☐ Chocolate 
Created 49 years ago
(5) ☐ Butter 
Created 49 years ago"
`);
});
