import { NextRequest } from "next/server";

const API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(req: NextRequest) {
  // Endpoint
  // POST /v3/forms/#{form_id}/subscribe

  if (!API_KEY || !FORM_ID) {
    console.error("Error: API_KEY or FORM_ID is missing");
    return new Response("Error: API_KEY or FORM_ID is missing", {
      status: 500,
    });
  }

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
