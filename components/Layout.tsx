import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '@components/Header';
import { useStore } from '@store/store';
import { Goal } from '@types/types';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      });
    }
  }, [session, setUser]);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;