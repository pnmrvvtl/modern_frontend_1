"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Priority } from '@/types/todo';

export default async function updateTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Todo ID is required for updating.");
  }

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
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to update todo: ${error.message}`);
    }

    revalidatePath("/todos");
  } catch (e) {
    console.error(e);
    throw e;
  }
}
