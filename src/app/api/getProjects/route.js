import ProjectSchema from "@/app/database/schema/ProjectSchema"

export async function POST(req) {
    try {
        const {username} = await req.json()
        console.log("the account", username)
        let response = await ProjectSchema.find({account: username}).populate("tasks")
        console.log(response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 