
import AccSchema from "@/app/database/schema/AccSchema"
import mongoose from "mongoose"


export async function POST(req) {
    try {
        const details = await req.json()
        console.log("username sent to api", details)
        let checkIfExist = await AccSchema.find({username: details.username})
        if(Array.isArray(checkIfExist) && checkIfExist.length === 0) {
          let response = await AccSchema.create({...details})
          return new Response(JSON.stringify(response))

        } else {
          return new Response(JSON.stringify("Account exists"))

        }

    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }



}
    