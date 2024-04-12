export async function GET() {
  if (!process.env.YOUTUBE_API_KEY) {
    return new Response("No Youtube API key found.", { status: 500 });
  }

  try {
    const channelId = "UCCIFp-Se_xjfYc94H04oK7Q"; // Brian Ruiz's channel ID
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Get channel statistics
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
    );
    const statsData = await statsResponse.json();
    const subscribers = statsData.items[0].statistics.subscriberCount;

    // Get last 4 videos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=4&key=${apiKey}`,
    );
    const videosData = await videosResponse.json();
    const videos = videosData.items.map((item: any) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    return Response.json({
      subscribers,
      videos,
    });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, { status: 200 });
  }
}
