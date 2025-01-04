'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, signup } from '@/actions/login';
import { toast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<string | undefined>
  ) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await action(formData);

      if (response) {
        toast({
          title:       'Error',
          description: response || 'Something went wrong!',
          variant:     'destructive',
        });
      } else {
        toast({
          title:       'Success',
          description: `You have successfully ${hasAccount ? 'logged in' : 'signed up'}.`,
          variant:     'default',
        });
      }
    } catch (err) {
      console.error('Unexpected error on client:', err);
      toast({
        title:       'Unexpected Error',
        description: 'Something went wrong. Please try again later.',
        variant:     'destructive',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {hasAccount === null && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Do you have an account?</h2>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setHasAccount(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
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
                disabled={loading}
                className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                ) : null}
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
