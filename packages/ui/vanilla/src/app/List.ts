//

import { Todo } from "@todolist/core";

//

export class List {
  input = document.createElement("input");
  list = document.createElement("ul");
  constructor(private rootElement: HTMLElement) {
    this.rootElement.innerHTML = "";
    this.rootElement.append(this.input);
    this.rootElement.append(this.list);
  }

  updateList(items: ReadonlyArray<Todo>): void {
    this.list.innerHTML = items
      .map(todo => `<li>${todo.title}</li>`)
      .reduce((html, li) => html + li, "");
  }
}
