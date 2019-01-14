//

import { Todo } from "@todolist/core";
import { listView } from "../list";

//

test("should return list of 0 todos", () => {
  expect(listView([])).toMatchSnapshot();
});

test("should return list of one foo todo", () => {
  expect(
    listView([createFakeTodo({ id: "42", title: "foo" })])
  ).toMatchSnapshot();
});

//

function createFakeTodo(template: Partial<Todo>): Todo {
  return {
    completed: false,
    createdAt: new Date(0),
    id: "",
    title: "",
    updatedAt: new Date(0),
    ...template
  };
}
