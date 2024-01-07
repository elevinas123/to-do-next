
import Project from "@/app/database/schema/ProjectSchema";
;

export async function POST(req) {
    try {
        const {type, name, description, index, account, parent, isRootProject, place} = await req.json()
        let response = await Project.create({type, onModel: [], place, index, name, isRootProject:isRootProject,  description, account, tasks: [ ], parent:parent})
        console.log(response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 


  export async function PUT(req) {
    try {
        const { projectId, taskId, onModel } = await req.json();
        console.log("ids", projectId, taskId);

        let response = await Project.findByIdAndUpdate(
            projectId,
            { 
                $push: { 
                    tasks: taskId,  // Add the new task's ID to the tasks array
                    onModel: onModel // Add the model name to the onModel array
                }
            },
            { new: true, safe: true, upsert: true }
        );

        let projects = await Project.findById(projectId);
        console.log("the database response", projects);

        return new Response(JSON.stringify(projects));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}


