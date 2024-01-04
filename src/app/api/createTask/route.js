import Project from "@/app/database/schema/ProjectSchema";
import Task from "@/app/database/schema/TaskSchema";

;

export async function POST(req) {
    try {
        const taskObj = await req.json()
        console.log(taskObj)
        let task = await Task.create(taskObj)



      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 

  export async function PUT(req) {
    try {
        const {id, taskId, text, completed} = await req.json()
        console.log("put task", id, taskId, text, completed)
        let task = await Task.updateOne(
          { "_id": taskId, "subTasks.subTaskId": id },
          { "$set": { "subTasks.$": {text: text, completed: completed, subTaskId: id} } } // Overwrite the entire sub-task object
      )
        console.log(task)

      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  }
