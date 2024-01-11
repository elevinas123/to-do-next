
import  Project  from '@/app/database/schema/ProjectSchema';



export async function PUT(req) {
    try {
        const {id, ...updateFields } = await req.json();
        console.log("cia turetum tu prinint", {id, ...updateFields })
        // Constructing the update object dynamically
        let updateObject = {};
        for (let key in updateFields) {
            if (updateFields.hasOwnProperty(key)) {
                updateObject[key] = updateFields[key];
            }
        }
        console.log(updateObject)
        // If updateObject is empty, throw an error or return a message
        if (Object.keys(updateObject).length === 0) {
            throw new Error('No update fields provided');
        }

        // Update the task
        const response = await Project.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        console.log("Updated task", response);

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

