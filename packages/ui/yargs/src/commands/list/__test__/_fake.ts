import { filterTodosFn, Todo, TodoDataSource } from "@todolist/core";
import { ListCommand } from "..";

export const dataSource: Record<
  keyof Pick<TodoDataSource, "getTodos">,
  jest.Mock
> = {
  getTodos: jest.fn(fixtures)
};

export const logger: Record<keyof Pick<Console, "log">, jest.Mock> = {
  log: jest.fn()
};

export const todoDataSource: Record<keyof Pick<Console, "log">, jest.Mock> = {
  log: jest.fn()
};

export const command = new ListCommand(
  filterTodosFn,
  (logger as any) as Console,
  (dataSource as any) as TodoDataSource
);

// TODO(douglasduteil): extract this...
function fixtures(): Todo[] {
  return [
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
  ];
}
