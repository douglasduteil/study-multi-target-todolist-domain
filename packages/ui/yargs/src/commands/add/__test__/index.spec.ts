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

test("'add' should call 'dataSource.addTodo' with the given message", () => {
  const parseFn = jest.fn();
  yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["add", "Hello World"], parseFn);
  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.addTodo).toHaveBeenCalledWith({
    completed: false,
    title: "Hello World"
  });
});

test("'a'  should call 'dataSource.addTodo' with the given message", () => {
  const parseFn = jest.fn();
  yargs
    .scriptName("test")
    .command(command)
    .wrap(80)
    .parse(["a", "Hello Momo"], parseFn);
  const [[error]] = parseFn.mock.calls;
  expect(error).toBeNull();
  expect(dataSource.addTodo).toHaveBeenCalledWith({
    completed: false,
    title: "Hello Momo"
  });
});
