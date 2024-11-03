export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.YOUTUBE_API_KEY) {
    return new Response("No Youtube API key found.", { status: 500 });
  }

  try {
    const channelId = "UCCIFp-Se_xjfYc94H04oK7Q";
    const apiKey = process.env.YOUTUBE_API_KEY;

    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );
    const statsData = await statsResponse.json();
    const subscribers = statsData.items[0].statistics.subscriberCount;

    return Response.json({
      subscribers,
    });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, { status: 200 });
  }
}
export const revalidate = 86400;
