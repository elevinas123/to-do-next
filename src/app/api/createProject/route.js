
import ProjectSchema from "@/app/database/schema/ProjectSchema";

;

export async function POST(req) {
    try {
        const {name, description, account} = await req.json()
        let response = await ProjectSchema.create({name, description, account, tasks: [ ]})
        console.log(response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 



export async function PUT(req) {
    try {
        const {projectId, taskId} = await req.json()
        console.log("ids", projectId, taskId)
        let response = await ProjectSchema.findByIdAndUpdate(
            projectId,
            { $push: { tasks: taskId } }, // Add the new task's ID to the project
            { new: true, safe: true, upsert: true }
          );
        let projects = await ProjectSchema.findById(projectId)
        console.log("the database response", await projects)
      return new Response(JSON.stringify(projects))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 

