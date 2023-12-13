
import mongoose from "mongoose"

const connectDB = async (url) => {
  mongoose.connect(url)
}

export async function GET(req) {
  console.log("here")
  await connectDB(process.env.MONGO_URI).catch(error => console.log(error))
  console.log("connected")
  return new Response("connected")
}
    