"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Priority } from '@/types/todo';
import { validateRequest } from '@/lib/validate-request';

export default async function createTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { user } = await validateRequest(false);

  const todoData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date((formData.get("due_date") as object).toString())
      : null,
    priority: formData.get("priority")?.toString() || Priority.P4,
    completed: Boolean(formData.get("completed")),
    user_id: user.id,
  };

  try {
    const { data, error } = await supabase
      .from("todos")
      .insert([todoData])
      .select('id');

    if (error) {
      throw new Error(`Failed to insert todo: ${error}`);
    }

    revalidatePath("/todos");
    return data[0].id;
  } catch (e) {
    console.error(e)
  }
}