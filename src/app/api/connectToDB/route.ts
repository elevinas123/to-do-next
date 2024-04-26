
import mongoose from "mongoose"

const connectDB = async (url: string) => {
  mongoose.connect(url)
}

export async function POST(req: Request) {
  console.log("here")
  if (!process.env.MONGO_URI) throw new Error ("Where Mongo URI?")
    await connectDB(process.env.MONGO_URI).catch((error) => console.log(error));
  console.log("connected")
  return new Response("connected")
}
    