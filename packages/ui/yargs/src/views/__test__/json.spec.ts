//

import { Todo } from "@todolist/core";
import { jsonView } from "../json";

//

test("should return list of 0 todos", () => {
  expect(jsonView([])).toMatchSnapshot();
});

test("should return list of one foo todo", () => {
  expect(jsonView([createFakeTodo({ title: "foo" })])).toMatchSnapshot();
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
