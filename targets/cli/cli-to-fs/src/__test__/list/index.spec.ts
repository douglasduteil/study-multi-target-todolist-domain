//

import LowMemoryAdapter from "lowdb/adapters/Memory";
import { testCli } from "..";
import { cli } from "../../index";

//

test("list should display the current uncompleted todos", () => {
  const log = jest.fn();
  testCli()
    .scriptName("test")
    .wrap(80)
    .parse(["list"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeNull();
  expect(output).toMatchInlineSnapshot(`""`);
});

test("ls should display the current uncompleted todos", () => {
  const log = jest.fn();
  testCli()
    .scriptName("test")
    .wrap(80)
    .parse(["ls"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeNull();
  expect(output).toMatchInlineSnapshot(`""`);
});

test("la should display the all the todos", () => {
  const log = jest.fn();
  testCli()
    .scriptName("test")
    .wrap(80)
    .parse(["la"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeNull();
  expect(output).toMatchInlineSnapshot(`""`);
});

test("ll should display the current uncompleted todos with extra info", () => {
  const log = jest.fn();
  testCli()
    .scriptName("test")
    .wrap(80)
    .parse(["ll"], log);
  const [[error, , output]] = log.mock.calls;
  expect(error).toBeNull();
  expect(output).toMatchInlineSnapshot(`""`);
});
