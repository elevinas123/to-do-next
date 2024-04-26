import Project from "../../database/schema/ProjectSchema";


export async function POST(req: Request) {
    try {
        const { projectId } = await req.json();
        console.log("projectID", projectId)
        // First level of population
        let project = await Project.findById(projectId)
            .populate({
                path: "tasks",
                refPath: "onModel",
            })
            .exec();

        for (let task of project.tasks) {
            if (task.type === "Project") {
                await task.populate({
                    path: "tasks",
                    refPath: "onModel",
                }); // Ensure the task is populated
            }
        }

        return new Response(JSON.stringify(project.toObject()));
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
