'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, signup } from '@/actions/login';
import { AuthError } from '@supabase/auth-js';
import { toast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [hasAccount, setHasAccount] = useState<boolean | null>(null); // Tracks user's choice

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<AuthError | undefined>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const error = await action(formData);
      if (error) {
        toast({
          title:       'Error',
          description: error.message || 'Something went wrong!',
          variant:     'destructive',
        });
      }
    } catch (err) {
      console.error('error', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Ask if the user has an account */}
        {hasAccount === null && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Do you have an account?</h2>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setHasAccount(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Yes, Sign In
              </Button>
              <Button
                onClick={() => setHasAccount(false)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                No, Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Combined Form for Sign In and Sign Up */}
        {hasAccount !== null && (
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              {hasAccount ? 'Sign In' : 'Sign Up'}
            </h2>
            <form
              onSubmit={(e) => handleFormSubmit(e, hasAccount ? login : signup)}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${
                  hasAccount
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {hasAccount ? 'Log In' : 'Sign Up'}
              </Button>
              <p
                className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-gray-700"
                onClick={() => setHasAccount((prev) => !prev)}
              >
                {hasAccount
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
