export interface Todo {
  id: number | string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
}

export enum Priority {
  P1,
  P2,
  P3,
  P4
}
