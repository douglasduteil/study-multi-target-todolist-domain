//

import { Todo, TodoDataSource } from "@todolist/core";
import { Component, ContextType, KeyboardEvent } from "react";
import { ContainerContext, IDENTIFIER } from "../core";

//

interface TodoListState {
  input: string;
  todos: Todo[];
}

export class TodoList extends Component<{}, TodoListState> {
  public static contextType = ContainerContext;
  public context!: ContextType<typeof ContainerContext>;
  constructor(props: {}) {
    super(props);
    this.state = { input: "", todos: [] };
  }
  public componentDidMount(): void {
    this.update();
  }

  public render(): JSX.Element {
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

  private onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const input = event.target as HTMLInputElement;
    const todo: Todo = {
      completed: false,
      createdAt: new Date(0), // ! to remove
      id: "", // ! to remove
      title: input.value,
      updatedAt: new Date(0) // ! to remove
    };

    (async () => {
      const todoDataSource = this.context.get<TodoDataSource>(
        IDENTIFIER.DATA_SOURCE
      );
      await todoDataSource.addTodo(todo);

      await this.update();
    })();
  };

  private async update(): Promise<void> {
    const todoDataSource = this.context.get<TodoDataSource>(
      IDENTIFIER.DATA_SOURCE
    );
    const todos = await todoDataSource.getTodos();

    this.setState({ todos });
  }
}
