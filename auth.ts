import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/util/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User Not Found");
        }

        if (user.password === credentials.password) {
          console.log(user);
          return user;
        }
        throw new Error("Invalid credentials");
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
