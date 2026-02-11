

"use server";

import { success, z } from "zod";

const schema = z.object({
    eventName: z.string().min(1, "Event name is required"),
    eventDate: z.string().min(1, "Event date is required"),
    eventImage: z.file().max(10_000_000).mime(["image/jpg", "image/png"])
});

export default async function NewEventAction(prevState: any, formData: FormData) {
    const title = formData.get("eventName");
    const date = formData.get("eventDate");
    const image = formData.get("eventImage");

const validaded = schema.safeParse({ eventName: title, eventDate: date, eventImage: image });

if (!validaded.success) {
    return {
        success: false,
        values: { eventName: String(title ?? ""), eventDate: String(date ?? ""), eventImage: image },
        errors: z.flattenError(validaded.error).fieldErrors
    }
}

    const response = await fetch("http://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { 
            "Content-Type": "multipart/form-data" 
        },
        body: formData
        }); 

    const data = await response.json();
    console.log("response data", data);

    return { };
}   