import TaskModel from "../../database/schema/TaskSchema";

export async function POST(req) {
    try {
        const { id } = await req.json();
        console.log(id);
        console.log(req.nextUrl);
        let response = await TaskModel.findById(id);

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}
