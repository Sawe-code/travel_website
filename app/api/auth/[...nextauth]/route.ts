// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // credentials is now typed correctly
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          // return a User object matching NextAuth's User type
          return {
            id: "1",               // must be a string
            name: "Demo User",
            email: "user@example.com",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
