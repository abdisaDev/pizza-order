import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/util/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/" },
  session: { strategy: "jwt", maxAge: 10 * 60 },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          user.password,
          String(credentials.password)
        );

        if (isPasswordValid) {
          return user;
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
      session.user = token.user;
      return session;
    },
  },
});
