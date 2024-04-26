
import Project, { IProject } from '../../database/schema/ProjectSchema';


export async function PUT(req: Request) {
    try {
        const projects: IProject[] = await req.json(); // Assuming tasks is an array of task updates
        console.log("Updating tasks", projects);

        const updateOperations = projects.map((project) => {
            return {
                updateOne: {
                    filter: { _id: project._id }, // Filter by task ID
                    update: { $set: { place: project.place, index: project.index } }, // Fields to update
                },
            };
        });

        const result = await Project.bulkWrite(updateOperations);
        console.log("Bulk update result of projets", result);

        return new Response(JSON.stringify(result));
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
