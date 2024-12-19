'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: user } = await supabase.auth.getUser();

  return user.user ? user.user : null;
}
