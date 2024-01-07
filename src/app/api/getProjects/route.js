import Project from "@/app/database/schema/ProjectSchema";
import Task from "@/app/database/schema/TaskSchema";

export async function GET(req) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId");

        let project = await Project.findById(projectId)
            .populate({
                path: 'tasks', // Populate the entire 'tasks' array
                refPath: 'onModel'
            })
            .exec();

        console.log("Populated project:", JSON.stringify(project.toObject(), null, 2));

        return new Response(JSON.stringify(project.toObject()));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
