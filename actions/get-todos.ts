'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Priority, Todo } from '@/types/todo';

interface GetTodosParams {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: Priority;
  completed?: boolean;
}

export async function getTodos(params: GetTodosParams): Promise<Todo[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase.from('todos').select('*');

  if (params.title) {
    query = query.ilike('title', `%${params.title}%`);
  }

  if (params.description) {
    query = query.ilike('description', `%${params.description}%`);
  }

  if (params.due_date) {
    query = query.eq('due_date', params.due_date);
  }

  if (params.priority) {
    query = query.eq('priority', params.priority);
  }

  if (params.completed !== undefined) {
    query = query.eq('completed', params.completed);
  }

  const { data, error } = await query.order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching todos:', error);
    return [];
  }

  const todos: Todo[] = data.map((item: Todo) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    due_date: new Date(item.due_date).toISOString().split('T')[0],
    priority: item.priority,
    completed: item.completed,
  }));

  return todos;
}
