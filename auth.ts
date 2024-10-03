import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './app/util/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: '/dashboard/orders', signOut: '/' },
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: { strategy: 'jwt', maxAge: 10 * 60 },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
          include: { resturant: true, role: true },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        );

        if (isPasswordValid) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = user;
          return rest;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
});
