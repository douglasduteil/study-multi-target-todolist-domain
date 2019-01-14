//

export type Todo = Readonly<{
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  id: string;
  priority?: string;
  tags?: string[];
  title: string;
  updatedAt: Date;
}>;

export type NewTodo = Pick<
  Todo,
  Exclude<keyof Todo, "createdAt" | "id" | "updatedAt">
>;

export type TodoWithoutMeta = Pick<
  Todo,
  Exclude<keyof Todo, Exclude<keyof Todo, "completed" | "id" | "title">>
>;
