import { Todo, TodoDataSource } from "@todolist/core";
import { List } from "./List";

//

// ? Can be a simple function...
export class AppComponent {
  constructor(
    private rootElement: HTMLElement,
    private todoDataSource: TodoDataSource
  ) {}

  init(): void {
    const todoList = new List(this.rootElement);

    const update = async () => {
      todoList.updateList(await this.todoDataSource.getTodos());
    };

    const addTodo = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      const todo: Todo = {
        completed: false,
        createdAt: new Date(0),
        id: "",
        title: input.value,
        updatedAt: new Date(0)
      }; // to remove // to remove // to remove
      await this.todoDataSource.addTodo(todo);
      await update();
      return false;
    };

    this.rootElement.addEventListener("change", addTodo);

    update();
  }
}
