'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function getTodo(id: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User must be authenticated to get todo.");
  }

  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      throw new Error(`Failed to fetch todo: ${error.message}`);
    }

    return data[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
}


