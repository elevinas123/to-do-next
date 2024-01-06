import RecurrentProject from "@/app/database/schema/RecurrentProjectShema";

export async function PUT(req) {
    try {
        const { taskId, projectId, date, ...updateFields } = await req.json();
        console.log("task", taskId, projectId, date);

        // Retrieve the project document
        let project = await RecurrentProject.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        // Check if the date exists in the tasks map
        if (project.tasks.has(date)) {
            const tasksForDate = project.tasks.get(date);

            // Find the task by ID and update it
            const taskIndex = tasksForDate.findIndex(task => task._id.toString() === taskId);
            if (taskIndex > -1) {
                // Update the task with provided fields
                for (let key in updateFields) {
                    if (updateFields.hasOwnProperty(key)) {
                        tasksForDate[taskIndex][key] = updateFields[key];
                    }
                }
            } else {
                throw new Error('Task not found');
            }

            // Update the project document
            project.tasks.set(date, tasksForDate);
            await project.save();

            console.log("the database response", project);
            return new Response(JSON.stringify(project));
        } else {
            throw new Error('Date not found in tasks');
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}
