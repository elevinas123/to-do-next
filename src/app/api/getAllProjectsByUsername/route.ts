import Project from "../../database/schema/ProjectSchema";
import TaskModel from "../../database/schema/TaskSchema";

export async function POST(req: Request) {
    try {
        const { account } = await req.json();
        console.log("accountasasd", account);
        const t = TaskModel
        let projects = await Project.find({ account: account, isRootProject: true })
            .populate({
                path: "tasks",
                refPath: "onModel",
            })
            .exec();
        console.log("projects", projects);
        for (let i = 0; i < projects.length; i++) {
            for (let task of projects[i].tasks) {
                console.log(task);
                if (task.type === "Project") {
                    await task.populate({
                        path: "tasks",
                        refPath: "onModel",
                    }); // Ensure the task is populated
                }
            }
        }

        console.log("projektelis kodel netoks", projects);
        return new Response(JSON.stringify(projects));
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
