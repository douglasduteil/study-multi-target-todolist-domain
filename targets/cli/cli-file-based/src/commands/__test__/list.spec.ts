//

import yargs from "yargs";
import { FilterOptions } from "../../core/list";
import { builder, mapAliasOnOptions } from "../list";

//

const defaultArgv: FilterOptions = { all: false, json: false, long: false };

//

describe("builder", () => {
  it("should add list options to cli", () => {
    const log = jest.fn();
    builder(yargs.usage("foo list options")).showHelp(log as any);
    expect(log.mock.calls[0]).toMatchSnapshot();
  });
});

//

describe("mapAliasOnOptions", () => {
  test("should do nothing if no alias is given", () => {
    expect(
      mapAliasOnOptions({ $0: "foo", _: [], ...defaultArgv })
    ).toMatchSnapshot();
  });

  test("should do nothing if the alias is not found", () => {
    expect(
      mapAliasOnOptions({
        $0: "foo",
        _: ["oof"],
        ...defaultArgv
      })
    ).toMatchSnapshot();
  });

  test('"ls" do nothing', () => {
    expect(
      mapAliasOnOptions({
        $0: "foo",
        _: ["ls"],
        ...defaultArgv
      })
    ).toMatchSnapshot();
  });

  test('"la" should activate "all" option', () => {
    expect(
      mapAliasOnOptions({
        $0: "foo",
        _: ["la"],
        ...defaultArgv
      })
    ).toMatchSnapshot();
  });

  test('"ll" should activate "long" option', () => {
    expect(
      mapAliasOnOptions({
        $0: "foo",
        _: ["ll"],
        ...defaultArgv
      })
    ).toMatchSnapshot();
  });
});
