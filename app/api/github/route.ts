import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const username = searchParams.get('username')

  if (!username) {
    return new Response("Please provide a username", {status: 200})
  }

  try {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    const response = await fetch(url);
    const data = await response.json();
    const stars = data.reduce(
      (acc: number, curr: { stargazers_count: number }) =>
        acc + curr.stargazers_count,
      0
    );
    return Response.json({ stars });
  } catch (err) {
    console.error(err);
    return new Response(`Something went wrong: ${err}`, {status: 200})
  }
}
