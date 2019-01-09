//

import { Todo } from "@todolist/core";

//

export class List {
  private input = document.createElement("input");
  private list = document.createElement("ul");
  constructor(private rootElement: HTMLElement) {
    this.rootElement.innerHTML = "";
    this.rootElement.append(this.input);
    this.rootElement.append(this.list);
  }

  public updateList(items: Todo[]): void {
    this.list.innerHTML = items
      .map(todo => `<li>${todo.title}</li>`)
      .reduce((html, li) => html + li, "");
  }
}
