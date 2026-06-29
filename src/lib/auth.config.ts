import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/applications');

      if (isProtected && !isLoggedIn) {
        return false; // redirect to login page
      }
      return true;
    },
  },
  providers: [], // Yahan empty rakho — actual providers full auth.ts mein honge
};