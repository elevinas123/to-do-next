import AccSchema from "../../database/schema/AccSchema";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const response = await AccSchema.create({ ...data });
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }));
    }
}
