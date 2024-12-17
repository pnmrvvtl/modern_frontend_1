export interface Todo {
  id: number | string;
  title: string;
  description: string;
  dueDate: string;
  priority: "P1" | "P2" | "P3";
  completed: boolean;
}
