//

import { NewTodo, Todo, TodoDataSource } from "@todolist/core";
import { Component, ContextType, KeyboardEvent } from "react";
import { ContainerContext, IDENTIFIER } from "../core";

//

interface TodoListState {
  input: string;
  todos: ReadonlyArray<Todo>;
}

export class TodoList extends Component<{}, TodoListState> {
  static contextType = ContainerContext;
  context!: ContextType<typeof ContainerContext>;
  constructor(props: {}) {
    super(props);
    this.state = { input: "", todos: [] };
  }
  componentDidMount(): void {
    this.update();
  }

  render(): JSX.Element {
    const { todos } = this.state;

    return (
      <div>
        <h1>Next.js - Todo list</h1>

        <input type="text" onKeyPress={this.onKeyPress} />

        <ul>
          {todos.map(todo => (
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
    const todo: NewTodo = {
      completed: false,
      title: input.value
    };

    (async () => {
      const todoDataSource = this.context.get<TodoDataSource>(
        IDENTIFIER.DATA_SOURCE
      );
      await todoDataSource.addTodo(todo);

      await this.update();
    })();
  };

  async update(): Promise<void> {
    const todoDataSource = this.context.get<TodoDataSource>(
      IDENTIFIER.DATA_SOURCE
    );
    const todos = await todoDataSource.getTodos();

    this.setState({ todos });
  }
}
