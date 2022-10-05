import { PrismaAdapter } from "@next-auth/prisma-adapter";
import argon2 from "argon2";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "src/server/prismadb";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role;
        token.id = user?.id;
      }

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          role: token?.role,
          id: token?.id,
          ...session.user,
        },
      };

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (result) {
            const match = await argon2.verify(
              result.password || "",
              credentials?.password || ""
            );
            if (match) {
              return result;
            } else {
              throw new Error("Password not match");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
