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
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    // async session({ session }) {
    //   if (session) {
    //     // Check if user already exists in authors table
    //     const existingAuthor =
    //       await sql`SELECT * FROM authors WHERE email = ${session.user.email}`.then(
    //         (res) => res.rows[0],
    //       );

    //     let authorId;
    //     if (existingAuthor) {
    //       // If user already exists, use their id
    //       authorId = existingAuthor.id;
    //     } else {
    //       // If user does not exist, add them to authors table and use the returned id
    //       authorId =
    //         await sql`INSERT INTO authors (name, email, image) VALUES (${session.user.name}, ${session.user.email}, ${session.user.image}) RETURNING id`.then(
    //           (res) => res.rows[0].id,
    //         );
    //     }

    //     // Add id to session.user
    //     session.user.id = authorId;
    //   }
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
