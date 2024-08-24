import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { StoreProvider } from '../store';
import { User } from '../types';
import { useStore } from '../store';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType<any>;
  pageProps: { session: SessionProvider['session']; [key: string]: any };
}) {
  const { user, setUser } = useStore();

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      } as User);
    }
  }, [session, setUser]);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}