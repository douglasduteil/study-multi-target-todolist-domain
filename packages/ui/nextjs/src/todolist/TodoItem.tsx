//

import { Todo } from "@todolist/core";
import React, { ChangeEvent, StatelessComponent } from "react";

//

export const TodoItem: StatelessCompdoonent<TodoItemProps> = props => {
  const toggleCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...todo, completed: true });
  };
  return (
    <div>
      <input id="toggle-all" type="checkbox" onChange={toggleCompleted} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>
  );
};

//
export interface TodoItemProps {
  todo: Todo;
  onChange: (newTodo: Todo) => void;
}
