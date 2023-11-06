const API_SECRET = process.env.CONVERTKIT_API_SECRET;

export async function GET() {
  // Endpoint
  // GET /v3/subscribers

  // Required parameters
  // api_secret - Your API secret key

  if (!API_SECRET) {
    console.error("API_SECRET is missing");
    return new Response("API_SECRET is missing", { status: 500 });
  }

  const url = `https://api.convertkit.com/v3/subscribers?api_secret=${API_SECRET}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    const data = await response.json();
    const subscribers = data.total_subscribers;
    return Response.json({ subscribers });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong: ${error}`, { status: 200 });
  }
}
