
import Project from "@/app/database/schema/ProjectSchema";

export async function GET(req) {
    try {
        const account = req.nextUrl.searchParams.get("account");
        let project = await Project.find({account: account, isRootProject: true})
        console.log(project)
        return new Response(JSON.stringify(project));
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
