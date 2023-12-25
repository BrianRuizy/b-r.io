import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return Response.json("Please provide a URL", { status: 400 });
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    if (response.ok) {
      return Response.json("online", { status: 200 });
    } else {
      return Response.json("offline", { status: 200 }); // or inaccessible
    }
  } catch (error) {
    return new Response(`error: ${error}`, { status: 500 });
  }
}
