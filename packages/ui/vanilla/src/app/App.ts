import {
  NewTodo,
  TodoDataSource,
  TodoListFilterFn,
  TodoListFilterOptions
} from "@todolist/core";
import { List } from "./List";

//

// ? Can be a simple function...
export class AppComponent {
  options: TodoListFilterOptions = { all: false, long: true };

  constructor(
    private rootElement: HTMLElement,
    private todoDataSource: TodoDataSource,
    private todoFilterFn: TodoListFilterFn
  ) {}

  init(): void {
    const todoList = new List(this.rootElement);

    const update = async () => {
      const data = await this.todoDataSource.getTodos();
      const filterTodos = this.todoFilterFn(this.options);
      const filteredData = filterTodos(data);

      todoList.updateList(filteredData);
    };

    const addTodo = async (event: Event) => {
      const input = event.target as HTMLInputElement;
      const todo: NewTodo = { title: input.value };
      await this.todoDataSource.addTodo(todo);
      await update();
    };

    const toggleAll = async () => {
      this.options.all = !this.options.all;
      await update();
    };

    todoList.input.addEventListener("change", addTodo);
    todoList.toggleAll.addEventListener("change", toggleAll);

    update();
  }
}
