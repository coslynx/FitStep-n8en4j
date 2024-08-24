import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useStore } from '../store';
import { User } from '../types';

const Header = () => {
  const { user, setUser } = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      } as User);
    }
  }, [session, setUser]);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">FitTrack</h1>

        <nav className="flex space-x-4">
          {user && (
            <>
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="text-gray-500 hover:text-gray-900">
                Sign Out
              </button>
            </>
          )}
          {!user && (
            <>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;