import { type NextRequest } from "next/server";

// Endpoint
// POST /v3/forms/#{form_id}/subscribe
const API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const url = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong: ${error}`, { status: 200 });
  }
}
