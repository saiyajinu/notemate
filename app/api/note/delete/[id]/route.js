import { connectToDB } from "@/utils/database";
import Note from "@/models/note";

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        console.log(params);
        const res = await Note.deleteOne({_id: params.id})

        return new Response("Note deleted", { status: 200 })
    } catch (error) {
        return new Response("Failed to delte note", { status: 500 })
    }
}