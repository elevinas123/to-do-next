import RecurrentProjectModel from "../../../database/schema/RecurrentProjectShema";

export async function DELETE(req) {
    try {
        const { projectId, taskId, date } = await req.json();

        // Retrieve the project document
        const project = await RecurrentProjectModel.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        // Remove taskId from referenceTasks
        project.referenceTasks = project.referenceTasks.filter(id => id.toString() !== taskId);

        // Check if the date exists in the tasks map
        if (project.tasks.has(date)) {
            let tasksForDate = project.tasks.get(date);

            // Remove the task with taskId from the tasks array
            tasksForDate = tasksForDate.filter(task => task._id.toString() !== taskId);

            // Update the tasks for the date
            project.tasks.set(date, tasksForDate);
        } else {
            throw new Error('Date not found in tasks');
        }

        // Save the updated project
        await project.save();

        // Optionally, delete the task from the Task collection
        //await Task.findByIdAndDelete(taskId);

        console.log("Task deleted successfully");
        return new Response(JSON.stringify({ message: "Task deleted successfully" }));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
