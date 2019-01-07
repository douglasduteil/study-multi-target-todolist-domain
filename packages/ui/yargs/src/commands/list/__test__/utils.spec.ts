//

import { ListOptions } from "../types";
import { mapAliasOnOptions } from "../utils";

//

const defaultArgv: ListOptions = { all: false, json: false, long: false };

//

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
