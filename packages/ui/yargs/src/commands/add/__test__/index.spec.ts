//

import { TodoDataSource } from "@todolist/core";
import yargs from "yargs";
import { AddCommand } from "..";

//

const dataSource = { addTodo: jest.fn() };
const command = new AddCommand((dataSource as any) as TodoDataSource);

afterEach(() => {
  dataSource.addTodo.mockReset();
});

//

test("'add' should display the current uncompleted todos", () => {
  const log = jest.fn();
  yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["add", "Hello World"], log);
  const [[error]] = log.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.addTodo).toHaveBeenCalledWith({
    completed: false,
    createdAt: new Date(0),
    id: "",
    title: "Hello World",
    updatedAt: new Date(0)
  });
});

test("'a' should display the current uncompleted todos", () => {
  const log = jest.fn();
  yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["a", "Hello Momo"], log);
  const [[error]] = log.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.addTodo).toHaveBeenCalledWith({
    completed: false,
    createdAt: new Date(0),
    id: "",
    title: "Hello Momo",
    updatedAt: new Date(0)
  });
});
