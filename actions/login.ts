'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.error('Login error:', error);
      return error.message.toString()
    }

  } catch (err) {
    console.error('Unexpected server error during login:', err);
    return 'An unexpected error occurred. Please try again.';
  }
}

export async function signup(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.error('Signup error:', error);
      return error.message.toString();
    }

  } catch (err) {
    console.error('Unexpected server error during signup:', err);
    return  'An unexpected error occurred. Please try again.';
  }
}