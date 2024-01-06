import RecurrentProject from "@/app/database/schema/RecurrentProjectShema"

export async function POST(req) {
    try {
        const project = await req.json()
        let response = await RecurrentProject.create(project)
        console.log(response)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 


  
export async function PUT(req) {
  try {
      const {taskId, projectId, task, date} = await req.json();
      console.log("task", taskId, projectId, task, date);

      // Update path for the tasks map
      const taskPath = `tasks.${date}`;

      let project = await RecurrentProject.findByIdAndUpdate(
          projectId,
          { 
            $push: { 
                referenceTasks: taskId, // Add task ID to referenceTasks
                [taskPath]: task // Add task object to the specific date in tasks map
            } 
          },
          { new: true, safe: true, upsert: true }
      );
      
      console.log("the database response", await project);
      return new Response(JSON.stringify(project));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }));
  }
}
