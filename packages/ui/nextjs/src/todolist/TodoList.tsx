//

import {
  NewTodo,
  Todo,
  TodoDataSource,
  TodoListFilterFn
} from "@todolist/core";
import { Component, ContextType, KeyboardEvent } from "react";
import { ContainerContext, IDENTIFIER } from "../core";
import { TodoListFilterOptions } from "@todolist/core";
import { DisplayOptions } from "./DisplayOptions";

//

interface TodoListState {
  input: string;
  options: TodoListFilterOptions;
  todos: ReadonlyArray<Todo>;
}

export const initialState: TodoListState = {
  input: "",
  options: { all: false, long: true },
  todos: []
};

export class TodoList extends Component<{}> {
  static contextType = ContainerContext;
  context!: ContextType<typeof ContainerContext>;
  state = initialState;

  //

  componentDidMount(): void {
    this.update();
  }

  render(): JSX.Element {
    const { todos, options } = this.state;

    const todolistFilterFn = this.context.get<TodoListFilterFn>(
      IDENTIFIER.CORE_FILTER
    );
    const filtredTodos = todolistFilterFn(options);

    console.log("render", options);

    return (
      <div>
        <h1>Next.js - Todo list</h1>

        <input type="text" onKeyPress={this.onKeyPress} />

        <DisplayOptions onChange={this.onOptionsChange} />

        <ul>
          {filtredTodos(todos).map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  //

  onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const input = event.target as HTMLInputElement;
    const todo: NewTodo = { completed: false, title: input.value };

    (async () => {
      const todoDataSource = this.context.get<TodoDataSource>(
        IDENTIFIER.DATA_SOURCE
      );
      await todoDataSource.addTodo(todo);

      await this.update();
    })();
  };
  onOptionsChange = (options: TodoListFilterOptions) =>
    this.setState({ options });

  async update(): Promise<void> {
    const todoDataSource = this.context.get<TodoDataSource>(
      IDENTIFIER.DATA_SOURCE
    );
    const todos = await todoDataSource.getTodos();

    this.setState({ todos });
  }
}
