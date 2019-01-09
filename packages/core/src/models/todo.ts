import { Omit } from "next/router";

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

export type NewTodo = Omit<Todo, "createdAt" | "id" | "updatedAt">;
