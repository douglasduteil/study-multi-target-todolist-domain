//

import { Todo, TodoWithoutMeta } from "@todolist/core";

//

export class List {
  input = document.createElement("input");
  list = document.createElement("ul");
  toggleAll = document.createElement("div");

  constructor(private rootElement: HTMLElement) {
    this.rootElement.innerHTML = "";
    this.rootElement.append(this.input);

    this.toggleAll.innerHTML = `
      <input id="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
    `;
    this.rootElement.append(this.toggleAll);

    this.rootElement.append(this.list);
  }

  updateList(items: ReadonlyArray<Todo | TodoWithoutMeta>): void {
    this.list.innerHTML = items
      .map(todo => `<li>${todo.title}</li>`)
      .reduce((html, li) => html + li, "");
  }
}
