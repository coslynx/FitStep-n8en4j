import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useStore } from '../store';
import { User } from '../types';
import Button from '@components/Button';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    router.push('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        // Handle error
      } else {
        setUser({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        } as User);
        router.push('/dashboard');
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Log In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;