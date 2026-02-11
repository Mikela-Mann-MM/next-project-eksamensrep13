// dal data access layer, bruges til at håndtere dataadgang 
// og forretningslogik i en applikation. Det fungerer som et lag mellem 
// applikationens forretningslogik og datakilden, hvilket gør det lettere at 
// vedligeholde og teste koden. I en Next.js-applikation kan dal bruges til at 
// organisere kode, der interagerer med databaser, API'er eller andre datakilder, 
// og det hjælper med at holde komponenterne rene og fokuserede på præsentationslogik.

"use server"; // dette indikerer at koden i denne fil skal køres på serveren, og ikke i browseren. Det er vigtigt, fordi vi bruger server-side funktioner som cookies og redirect, som ikke er tilgængelige i klienten. 
// Ved at markere filen som "server" sikrer vi, at disse funktioner fungerer korrekt og ikke forårsager fejl i browseren.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAllEvents() {
    const cookieStore = await cookies();
    if (!cookieStore.has('accessToken')) {
        redirect('/no-access');
    }
    const response = await fetch('http://localhost:4000/events');
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return data;
}

import { BlogPost } from "@/types/blogpost";

export async function getAllBlogPosts(): Promise<{
    data: BlogPost[];
}> {
    try {
        const res = await fetch('http://localhost:4000/posts');
        if (!res.ok) {
            throw new Error({ message: 'Failed to fetch blog posts' });
        }
        if (res.status !== 200) {
            throw new Error({ message: res.statusText });
        }

        // res.blob() = Binary Large Object
        // res.fromData() = Form Data Object
        // res.json() = JSON data
        // res.text() = text string


        if (res.headers.get["content-type"] === "application/json") {
            return await res.json();

            throw new Error({ message: 'Not Json' });
        } catch (error) {
            console.log("getAllBlogPosts error", error);
            return {
                success: false,
                message: 'An error occurred while fetching blog posts',
            }
        }
    }



//use server og async er kravet for at kunne kalde det en server action, og dermed kunne bruge det i en server komponent. 
// I dette tilfælde er getAllEvents en server action, fordi den er markeret med "use server" og er en asynkron funktion, der udfører server-side logik, herunder håndtering af cookies og omdirigering.
//man må ikke have en synkron server action.

// vs et server component (måske også kører asyncront), som er en React-komponent, der også kører på serveren. Serverkomponenter kan også bruge server-side funktioner og logik, 
// men de er ikke markeret med "use server" og kan derfor ikke kalde server-side funktioner direkte uden at bruge en server action.
// og de skal returnere JSX eller null, som kan renderes i browseren, mens en server action kan returnere data eller udføre handlinger uden at skulle returnere JSX.

export async function getBlogPostById(id: string): Promise<BlogPost> {
    if(!id) {
        throw new Error({message: 'ID is required to fetch blog post'});
    }
    if (isNaN(Number(id))) {
        const response = await fetch(`http://localhost:4000/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog post');
        }
        return await response.json();
    }