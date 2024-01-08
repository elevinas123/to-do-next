import Task from "@/app/components/Task";
import Project from "@/app/database/schema/ProjectSchema";

export async function GET(req) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId");

        // First level of population
        let project = await Project.findById(projectId)
            .populate({
                path: 'tasks',
                refPath: 'onModel'
            })
            .exec();

        console.log(JSON.stringify(project, null, 4)); // '4' here is for pretty printing

        for (let task of project.tasks) {
            if (task.type === 'Project') {
                await task.populate({
                    path: 'tasks',
                    refPath: 'onModel'
                }); // Ensure the task is populated
            }
        }
        

        console.log("Populated project:", JSON.stringify(project.toObject(), null, 2));

        return new Response(JSON.stringify(project.toObject()));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
