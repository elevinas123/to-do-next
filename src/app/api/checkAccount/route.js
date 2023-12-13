

import mongoose from "mongoose"
import AccSchema from './../../database/schema/AccSchema';


export async function POST(req) {
    try {
        const {username} = await req.json()
        console.log("username sent to api", username)
        let response = await AccSchema.find({username: username})
        
        return new Response(JSON.stringify(response))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }))
    }



}
    