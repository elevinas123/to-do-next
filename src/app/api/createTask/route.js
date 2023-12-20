
import ProjectSchema from "@/app/database/schema/ProjectSchema";
import TaskSchema from "@/app/database/schema/TaskSchema";

;

export async function POST(req) {
    try {
        const {name, date, parent} = await req.json()
        console.log(name, date, parent)
        let task = await TaskSchema.create({parent: parent, name: name, deadline: date, subTasks: []})



      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 

  export async function PUT(req) {
    try {
        const {id, taskId, text, completed} = await req.json()
        let task = await TaskSchema.updateOne(
          { "_id": taskId, "subTasks.id": id },
          { "$set": { "subTasks.$": {text, completed, id} } } // Overwrite the entire sub-task object
      )


      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  }
