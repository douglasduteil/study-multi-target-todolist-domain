//

import yargs from "yargs";
import { builder } from "../add";

//

describe("builder", () => {
  it("should add list options to cli", () => {
    const log = jest.fn();
    builder(yargs.usage("foo add <options>")).showHelp(log as any);
    expect(log.mock.calls[0]).toMatchSnapshot();
  });
});
