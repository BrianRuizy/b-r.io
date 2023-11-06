export async function GET() {
  if (!process.env.YOUTUBE_API_KEY) {
    return new Response("No Youtube API key found.", { status: 500 });
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCCIFp-Se_xjfYc94H04oK7Q&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const subscribers = data.items[0].statistics.subscriberCount;
    return Response.json({ subscribers });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, { status: 200 });
  }
}
