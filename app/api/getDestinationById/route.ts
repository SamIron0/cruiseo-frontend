import { Destination } from "@/types"
import { getDestinationById } from "@/db/admin"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const id: string = await req.json()
      const destination: Destination | null = await getDestinationById(id)
      if (destination != null) {
        return new Response(JSON.stringify(destination), {
          status: 200
        })
      }
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  } else {
    return new Response(JSON.stringify("Method Not Allowed"))
  }
}
