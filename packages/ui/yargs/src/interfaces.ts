//

import { Todo } from "@todolist/core";

//

export type TodoWithoutMeta = Pick<Todo, "completed" | "id" | "title">;
