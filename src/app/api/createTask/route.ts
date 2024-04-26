import TaskModel from "../../database/schema/TaskSchema";

export async function POST(req) {
    try {
        const taskObj = await req.json();
        console.log(taskObj);
        let task = await TaskModel.create(taskObj);

        return new Response(JSON.stringify(task));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}

export async function PUT(req) {
    try {
        const tasks = await req.json(); // Assuming tasks is an array of task updates
        console.log("Updating tasks", tasks);

        const updateOperations = tasks.map((task) => {
            return {
                updateOne: {
                    filter: { _id: task._id }, // Filter by task ID
                    update: { $set: { place: task.place, index: task.index } }, // Fields to update
                },
            };
        });

        const result = await TaskModel.bulkWrite(updateOperations);
        console.log("Bulk update result", result);

        return new Response(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
