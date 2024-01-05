import RecurrentProject from "@/app/database/schema/RecurrentProjectShema"

export async function POST(req) {
    try {
        const {name, description, account, dateCreated} = await req.json()
        let response = await RecurrentProject.create({name, dateCreated, isRootProject:true,  description, account, tasks: [ ]})
        console.log(response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 
