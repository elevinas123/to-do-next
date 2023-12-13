import Acc from "@/app/database/schema/AccSchema";
import { connectToDatabase } from "@/app/database/schema/mongoDB";

;

export async function POST(req) {
    try {
        const data = await req.json()
        console.log(data); // data should be in JSON format
        const response = await Acc.create({...data})
        console.log(await response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 