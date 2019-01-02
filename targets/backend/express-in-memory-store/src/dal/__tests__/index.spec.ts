//

//

import uuid from "uuid/v4";

import { database } from "../database";
import { addTodo, findTodo, getTodos, removeTodo, updateTodo } from "../todos";

//

jest.mock("uuid/v4");

//

test("#getTodos should return list of todos", async () => {
  // given
  database.todos = [];

  // when
  const expected = await getTodos();

  // then
  expect(expected).toBe(database.todos);
});

//

test("#addTodo should return list of todos", async () => {
  // given
  database.todos = [];
  (uuid as jest.Mock).mockImplementation(() => "foo-123-bar");

  // when
  const expected = await addTodo({ title: "Hello World", completed: false });

  // then
  expect(expected).toMatchSnapshot();
  expect(database.todos).toMatchSnapshot();
});

//

test("#removeTodo should return list of todos", async () => {
  // given
  database.todos = [
    {
      completed: true,
      id: "foo-123-bar",
      title: "Hello World"
    },
    {
      completed: false,
      id: "bar-123-foo",
      title: "Hello World"
    },
    {
      completed: false,
      id: "123-foo-bar",
      title: "Hello World"
    }
  ];

  // when
  const expected = await removeTodo("bar-123-foo");

  // then
  expect(expected).toMatchSnapshot();
  expect(database.todos).toMatchSnapshot();
});

//

test("#findTodo should return todo@bar-123-foo", async () => {
  // given
  database.todos = [
    {
      completed: true,
      id: "foo-123-bar",
      title: "Hello World"
    },
    {
      completed: false,
      id: "bar-123-foo",
      title: "Hello World"
    },
    {
      completed: false,
      id: "123-foo-bar",
      title: "Hello World"
    }
  ];

  // when
  const expected = await findTodo("bar-123-foo");

  // then
  expect(expected).toMatchSnapshot();
  expect(database.todos).toMatchSnapshot();
});

//

test("#updateTodo should mark as completed todo@bar-123-foo", async () => {
  // given
  database.todos = [
    {
      completed: true,
      id: "foo-123-bar",
      title: "Hello World"
    },
    {
      completed: false,
      id: "bar-123-foo",
      title: "Hello World"
    },
    {
      completed: false,
      id: "123-foo-bar",
      title: "Hello World"
    }
  ];

  // when
  const expected = await updateTodo("bar-123-foo", { completed: true });

  // then
  expect(expected).toMatchSnapshot();
  expect(database.todos).toMatchSnapshot();
});
