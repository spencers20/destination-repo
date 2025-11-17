import { type NextRequest, NextResponse } from "next/server"

const N8N_WEBHOOK_URL = "https://automations.manymangoes.com.au/webhook/linkedin_post"

export async function GET(req: NextRequest) {
  try {
    // Forward all query params
    const queryString = req.nextUrl.searchParams.toString()
    const forwardUrl = `${N8N_WEBHOOK_URL}?${queryString}`

    // Fetch from n8n webhook
    const response = await fetch(forwardUrl, { method: "GET" })
    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error("Error forwarding to n8n:", error)
    return NextResponse.json({ error: "Failed to contact n8n" }, { status: 500 })
  }
}
