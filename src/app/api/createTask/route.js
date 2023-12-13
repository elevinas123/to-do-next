
import ProjectSchema from "@/app/database/schema/ProjectSchema";
import TaskSchema from "@/app/database/schema/TaskSchema";

;

export async function POST(req) {
    try {
        const {name, date, parent} = await req.json()
        console.log(name, date, parent)
        let task = await TaskSchema.create({parent: parent, name: name, deadline: date, dateCreated: new Date().toDateString(), text: ""})



      return new Response(JSON.stringify(task))
    } catch (error) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }))
    }
  } 