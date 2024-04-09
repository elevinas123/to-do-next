import ProjectModel from "../../database/schema/ProjectSchema";


export async function DELETE(req) {
    try {
        const { parentId, id} = await req.json();

        // Retrieve the project document
        const project = await ProjectModel.findById(parentId);
        if (!project) {
            throw new Error('Project not found');
        }
        // Find the index of the task with the given taskId
        const index = project.tasks.findIndex(task => task._id.toString() === id);
        console.log(project)
        if (index !== -1) {
            // If the task was found, you can use the index here
            console.log("Index of the filtered out task:", index);

            // Then filter out the task from the array
            project.tasks.splice(index, 1)
            project.onModel.splice(index, 1)
        }
        console.log(project)
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
