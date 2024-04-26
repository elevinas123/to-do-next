


import AccSchema from '../../database/schema/AccSchema';


export async function POST(req: Request) {
    try {
        const {username} = await req.json()
        let response = await AccSchema.find({username: username})
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }))
    }



}
    