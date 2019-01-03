//

export interface Todo {
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  id: string;
  priority?: string;
  tags?: string[];
  title: string;
  updatedAt: Date;
}
