'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function getTodo(id: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to fetch todo: ${error.message}`);
    }

    return data[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
}


