"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { validateRequest } from '@/lib/validate-request';

export default async function deleteTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { user, id } = await validateRequest(true, parseInt(formData.get("id") as string));

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
