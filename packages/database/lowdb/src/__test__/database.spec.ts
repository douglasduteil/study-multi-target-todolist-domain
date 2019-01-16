//

import { NewTodo } from "@todolist/core";
import LowMemoryAdapter from "lowdb/adapters/Memory";
import { Database, LowDbShema, NotFoundError } from "..";

//

const dateNowSpy = jest.spyOn(Date, "now");

beforeEach(() => {
  dateNowSpy.mockReset();
});

afterAll(() => dateNowSpy.mockRestore());

test("should start with no todos", async () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));
  const result = await database.getTodos();
  expect(result).toEqual([]);
});

test("should add Omelette to the todo base", async () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));

  const todo: NewTodo = {
    title: "Omelette"
  };

  dateNowSpy.mockImplementation(() => new Date(42));
  const result = await database.addTodo(todo);
  expect(result).toMatchInlineSnapshot(`
Object {
  "completed": false,
  "createdAt": 1970-01-01T00:00:00.042Z,
  "id": "0",
  "title": "Omelette",
  "updatedAt": 1970-01-01T00:00:00.042Z,
}
`);
});

test("should add Omelette and Fromage to the todo base", async () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));

  const omelette: NewTodo = {
    title: "Omelette"
  };

  const fromage: NewTodo = {
    title: "Fromage"
  };

  dateNowSpy.mockImplementation(() => new Date(42));
  {
    const result = await database.addTodo(omelette);
    expect(result).toMatchInlineSnapshot(`
Object {
  "completed": false,
  "createdAt": 1970-01-01T00:00:00.042Z,
  "id": "0",
  "title": "Omelette",
  "updatedAt": 1970-01-01T00:00:00.042Z,
}
`);
  }
  {
    const result = await database.addTodo(fromage);
    expect(result).toMatchInlineSnapshot(`
Object {
  "completed": false,
  "createdAt": 1970-01-01T00:00:00.042Z,
  "id": "1",
  "title": "Fromage",
  "updatedAt": 1970-01-01T00:00:00.042Z,
}
`);
  }
});

test("should get the Chocolate", () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));
  fixturesTodosPopulate(database);
  const result = database.getTodo("2");
  expect(result).toMatchInlineSnapshot(`
Object {
  "completed": false,
  "createdAt": 1970-01-01T00:00:00.043Z,
  "id": "2",
  "title": "Chocolate",
  "updatedAt": 1970-01-01T00:00:00.043Z,
}
`);
});

test("should update Butter as completed", () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));
  fixturesTodosPopulate(database);
  dateNowSpy.mockImplementation(() => new Date(146));
  const result = database.updateTodo("5", { completed: true });
  expect(result).toMatchInlineSnapshot(`
Object {
  "completed": true,
  "completedAt": 1970-01-01T00:00:00.146Z,
  "createdAt": 1970-01-01T00:00:00.046Z,
  "id": "5",
  "title": "Butter",
  "updatedAt": 1970-01-01T00:00:00.146Z,
}
`);
});

test("should lock some Butter meta data", () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));
  fixturesTodosPopulate(database);
  dateNowSpy.mockImplementation(() => new Date(146));
  const result = database.updateTodo("5", {
    completedAt: new Date(1),
    createdAt: new Date(2),
    id: "lol",
    title: "More Butter",
    updatedAt: new Date(3)
  });
  expect(result).toMatchInlineSnapshot(`
Object {
  "completed": false,
  "completedAt": undefined,
  "createdAt": 1970-01-01T00:00:00.046Z,
  "id": "5",
  "title": "More Butter",
  "updatedAt": 1970-01-01T00:00:00.146Z,
}
`);
});

test("should remove Milk", async () => {
  const database = new Database(new LowMemoryAdapter<LowDbShema>("foo"));
  fixturesTodosPopulate(database);

  const actual = (await database.getTodos()).length;

  database.removeTodo("3");

  expect((await database.getTodos()).length).toBe(actual - 1);

  expect(() => database.getTodo("3")).toThrowError(NotFoundError);
});

//

// TODO(douglasduteil): extract this...
function fixturesTodosPopulate(database: Database): void {
  database.db
    .assign({
      index: 5,
      todos: [
        {
          completed: false,
          createdAt: new Date(42),
          id: "1",
          title: "Omelette",
          updatedAt: new Date(42)
        },
        {
          completed: false,
          createdAt: new Date(43),
          id: "2",
          title: "Chocolate",
          updatedAt: new Date(43)
        },
        {
          completed: true,
          createdAt: new Date(44),
          id: "3",
          title: "Milk",
          updatedAt: new Date(44)
        },
        {
          completed: true,
          createdAt: new Date(45),
          id: "4",
          title: "Bread",
          updatedAt: new Date(45)
        },
        {
          completed: false,
          createdAt: new Date(46),
          id: "5",
          title: "Butter",
          updatedAt: new Date(46)
        }
      ]
    })
    .write();
}
