'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { signOut } from '@/actions/sign-out';
import { User } from '@supabase/auth-js';

interface Props {
  user: User | null;
}

export default function SignOutButton({ user }: Props) {

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast({
        title:       'Error',
        description: 'Failed to sign out. Please try again.',
        variant:     'destructive',
      });
    } else {
      toast({
        title:       'Signed Out',
        description: 'You have been successfully signed out.',
        variant:     'default',
      });
    }
  };

  return (
    <div>
      {user ? (
        <>
          <span className="text-lg font-medium text-primary mr-2.5">{user.email}</span>
          <Button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
          >
        Sign Out
          </Button>
        </>
      ) : (
        <Link
          href="/login"
          className="text-lg font-medium text-primary hover:text-white bg-primary/10 hover:bg-primary transition-colors duration-200 px-4 py-2 rounded-lg shadow-sm"
        >
        Log In
        </Link>
      )}
    </div>);
}