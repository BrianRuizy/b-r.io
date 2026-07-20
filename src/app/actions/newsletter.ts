'use server'

const API_KEY = process.env.CONVERTKIT_API_KEY
const FORM_ID = process.env.CONVERTKIT_FORM_ID

export async function subscribeToNewsletter(formData: FormData) {
  if (!API_KEY || !FORM_ID) {
    throw new Error('ConvertKit is not configured')
  }

  let email = formData.get('email')
  if (typeof email !== 'string' || !email.trim()) {
    throw new Error('Email is required')
  }

  let response = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email.trim(),
      }),
    },
  )

  if (!response.ok) {
    let errorData = await response.json().catch(() => null)
    console.error('ConvertKit subscription error:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
    })
    throw new Error(`Failed to subscribe: ${response.statusText}`)
  }

  return { ok: true as const }
}
