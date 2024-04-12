import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const OPTIONS = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
