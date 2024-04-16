import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const result =
        await sql`SELECT id FROM authors WHERE email = ${session?.user?.email}`;

      if (!result.rows.length) {
        await sql`INSERT INTO authors (email, name) VALUES (${user.email}, ${user.name})`;
        // After inserting, get the id of the newly inserted author
        const newAuthor =
          await sql`SELECT id FROM authors WHERE email = ${user.email}`;
        if (session.user) {
          session.user.id = newAuthor.rows[0].id;
        }
      } else {
        // If the author already exists, add the id to the user object in the session
        if (session.user) {
          session.user.id = result.rows[0].id;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
