import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export async function GET() {
  return NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
    ],
  });
}