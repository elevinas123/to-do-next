
import Project from "@/app/database/schema/ProjectSchema";
import Task from "@/app/components/Task";
export async function GET(req) {
    try {
        const account = req.nextUrl.searchParams.get("account");
        let projects = await Project.find({account: account, isRootProject: true}).populate({
            path: 'tasks',
            refPath: 'onModel'
        })
        .exec();
        
        for(let i=0; i<projects.length; i++){
            for (let task of projects[i].tasks) {
                console.log(task)
                if (task.type === 'Project') {
                    await task.populate({
                        path: 'tasks',
                        refPath: 'onModel'
                    }); // Ensure the task is populated
                }
            }
        }

        console.log("projektelis kodel netoks", projects)
        return new Response(JSON.stringify(projects));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
