import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { User } from "@supabase/auth-js";

interface ValidationResult {
  user: User;
  id?: string;
}

export async function validateRequest(requireId: boolean = true, id?: number): Promise<ValidationResult> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.id || !user.email) {
    throw new Error("User must be authenticated to perform this action.");
  }

  if (requireId) {
    if (!id) {
      throw new Error("Todo ID is required for this action.");
    }
    return { user, id: id.toString() };
  }

  return { user };
}
