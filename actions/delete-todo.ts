"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function deleteTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User must be authenticated to delete todo.");
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Todo ID is required for deletion.");
  }

  try {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }

    revalidatePath("/todos");
  } catch (e) {
    console.error(e);
    throw e;
  }
}
