import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCCIFp-Se_xjfYc94H04oK7Q&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const subscribers = data.items[0].statistics.subscriberCount;
    res.status(200).json({ subscribers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ subscribers: 0 });
  }
}
