//

import yargs from "yargs";
import { builder } from "..";

//

test("should add list options to cli", () => {
  const log = jest.fn();
  builder(yargs.usage("foo list <options>"))
    .wrap(80)
    .showHelp(log as any);
  expect(log.mock.calls[0]).toMatchSnapshot();
});
