import AccSchema from "../../database/schema/AccSchema";

export async function POST(req) {
    try {
        const data = await req.json();
        console.log(data); // data should be in JSON format
        const response = await AccSchema.create({ ...data });
        console.log(await response);

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }));
    }
}
