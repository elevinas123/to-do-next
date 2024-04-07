

import RecurrentProject from "@/app/database/schema/RecurrentProjectShema";
import Task from "@/app/database/schema/TaskSchema";

export async function POST(req) {
    try {

      const {date, name, account} = await req.json()
        let response = await RecurrentProject.find({name, account}).populate("referenceTasks")
        if (response[0].tasks.has(date)) {
          return new Response(JSON.stringify(response));
        } else {
        console.log("response", response)
        let refTasks = response[0].referenceTasks.map(i => {
          return i._doc
      });
      
        console.log("response", refTasks)
        const taskPath = `tasks.${date}`;
        let project = await RecurrentProject.findByIdAndUpdate(
            response[0]._id,
            { 
              $push: { 
                  [taskPath]: refTasks // Add task object to the specific date in tasks map
              } 
            },
            { new: true, safe: true, upsert: true }
        );
        console.log("next", project)
        let fullUpdatedProject = await RecurrentProject.findById(response[0]._id)
        return new Response(JSON.stringify([fullUpdatedProject])) 
            
        }


      return new Response(JSON.stringify(response))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 