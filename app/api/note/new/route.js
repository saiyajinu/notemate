import { connectToDB } from "@/utils/database";
import Note from '@/models/note';

export const POST = async (req) => {
    const { userId, title, content } = await req.json();

    try{
        await connectToDB();
        console.log('%s, %s, %s', userId, title, content);
        const newNote = new Note({creator: userId, title : title, Content : content});
        console.log(newNote);
        await newNote.save();

        return new Response(JSON.stringify(newNote), {status: 201});

    } catch(error){
        console.log(error);
        return new Response("Failed to create a new note", {status: 500})
    }
}