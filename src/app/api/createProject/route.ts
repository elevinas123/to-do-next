import ProjectModel from "../../database/schema/ProjectSchema"

;

export async function POST(req) {
    try {
        const {name, description, index, account, parent, isRootProject, place} = await req.json()
        let response = await ProjectModel.create({type: "Project", onModel: [], place, index, name, isRootProject:isRootProject,  description, account, tasks: [ ], parent:parent})
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

        let response = await ProjectModel.findByIdAndUpdate(
            projectId,
            { 
                $push: { 
                    tasks: taskId,  // Add the new task's ID to the tasks array
                    onModel: onModel // Add the model name to the onModel array
                }
            },
            { new: true, safe: true, upsert: true }
        );

        let projects = await ProjectModel.findById(projectId);
        console.log("the database response", projects);

        return new Response(JSON.stringify(projects));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}


