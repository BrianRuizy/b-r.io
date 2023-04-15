import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  try {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    const response = await fetch(url);
    const data = await response.json();
    const stars = data.reduce(
      (acc: number, curr: { stargazers_count: number }) =>
        acc + curr.stargazers_count,
      0
    );
    res.status(200).json({ stars });
  } catch (err) {
    console.error(err);
    res.status(500).json({ stars: 0 });
  }
}
