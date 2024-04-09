import ProjectModel from "../../database/schema/ProjectSchema";
import TaskModel from "../../database/schema/TaskSchema";

export async function POST(req) {
    try {
        const {id, taskId} = await req.json()
        console.log(id, taskId)
        let task = await TaskModel.findByIdAndUpdate(
            taskId,
            { $push: { subTasks: {text: "", completed: false, subTaskId: id} } }, // Add the new task's ID to the project
            { new: true, safe: true, upsert: true }
          );
        console.log("creating", task)

      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 


  
export async function PUT(req) {
    try {
        const {projectId, taskId} = await req.json()
        console.log("ids", projectId, taskId)
        
        let projects = await ProjectModel.findById(projectId)
        console.log("the database response", await projects)
      return new Response(JSON.stringify(projects))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 

