
import Project from "@/app/database/schema/ProjectSchema";
import Task from "@/app/database/schema/TaskSchema";

export async function GET(req) {
  console.log("gerProjects reached")
    try {
        const projectId = req.nextUrl.searchParams.get("projectId");

        let project = await Project.findById(projectId).populate({
            path: 'tasks',
            refPath: 'tasks.onModel' // Use the 'onModel' field in tasks array to determine the model to populate
        });

        return new Response(JSON.stringify(project));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
