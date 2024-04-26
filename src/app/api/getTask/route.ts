import TaskModel from "../../database/schema/TaskSchema";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        let response = await TaskModel.findById(id);

        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}
