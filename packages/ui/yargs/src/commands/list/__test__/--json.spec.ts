//

import yargs from "yargs";
import { command, dataSource, logger } from "./_fake";

//

afterEach(() => {
  dataSource.getTodos.mockReset();
});

//

test("'list --json' should display uncompleted todos in json format", async () => {
  const parseFn = jest.fn();

  await yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["list", "--json"], parseFn);

  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.getTodos).toHaveBeenCalled();
  const [[output]] = logger.log.mock.calls;
  expect(output).toMatchInlineSnapshot(
    `"[{\\"completed\\":false,\\"id\\":\\"1\\",\\"title\\":\\"Omelette\\"},{\\"completed\\":false,\\"id\\":\\"2\\",\\"title\\":\\"Chocolate\\"},{\\"completed\\":false,\\"id\\":\\"5\\",\\"title\\":\\"Butter\\"}]"`
  );
});
