"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Priority } from '@/types/todo';
import { validateRequest } from '@/lib/validate-request';

export default async function updateTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { user, id } = await validateRequest(true, parseInt(formData.get("id") as string));

  const todoData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date(formData.get("due_date")?.toString()?? '')
      : null,
    priority: formData.get("priority")?.toString() || Priority.P4,
    completed: formData.get("completed") === "on",
  };

  try {
    const { error } = await supabase
      .from("todos")
      .update(todoData)
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to update todo: ${error.message}`);
    }

    revalidatePath("/todos");
  } catch (e) {
    console.error(e);
    throw e;
  }
}
