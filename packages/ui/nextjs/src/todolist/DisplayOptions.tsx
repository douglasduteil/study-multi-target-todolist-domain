//

import { TodoListFilterOptions } from "@todolist/core";
import { StatelessComponent } from "react";

//

export const DisplayOptions: StatelessComponent<
  DisplayOptionsProps
> = props => {
  return (
    <div>
      <input
        id="toggle-all"
        type="checkbox"
        onChange={e => props.onChange({ all: e.target.checked, long: true })}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>
  );
};

//
export interface DisplayOptionsProps {
  onChange: (options: TodoListFilterOptions) => void;
}
