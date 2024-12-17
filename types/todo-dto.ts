import { Priority } from '@/types/todo';

export interface TodoDto {
  id: string;
  title: string;
  description: string;
  due_date: Date;
  priority: Priority;
  completed: boolean;
}