"use server"; 

// dette indikerer at koden i denne fil skal køres på serveren, og ikke i browseren. Det er vigtigt, fordi vi bruger server-side funktioner som cookies og redirect, som ikke er tilgængelige i klienten. 
// Ved at markere filen som "server" sikrer vi, at disse funktioner fungerer korrekt og ikke forårsager fejl i browseren.


// dal data access layer, bruges til at håndtere dataadgang 
// og forretningslogik i en applikation. Det fungerer som et lag mellem 
// applikationens forretningslogik og datakilden, hvilket gør det lettere at 
// vedligeholde og teste koden. I en Next.js-applikation kan dal bruges til at 
// organisere kode, der interagerer med databaser, API'er eller andre datakilder, 
// og det hjælper med at holde komponenterne rene og fokuserede på præsentationslogik.


import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { BlogPost } from "@/types/blogpost";


//use server og async er kravet for at kunne kalde det en server action, og dermed kunne bruge det i en server komponent. 
// I dette tilfælde er getAllEvents en server action, fordi den er markeret med "use server" og er en asynkron funktion, der udfører server-side logik, herunder håndtering af cookies og omdirigering.
//man må ikke have en synkron server action.

// vs et server component (måske også kører asyncront), som er en React-komponent, der også kører på serveren. Serverkomponenter kan også bruge server-side funktioner og logik, 
// men de er ikke markeret med "use server" og kan derfor ikke kalde server-side funktioner direkte uden at bruge en server action.
// og de skal returnere JSX eller null, som kan renderes i browseren, mens en server action kan returnere data eller udføre handlinger uden at skulle returnere JSX.

export async function getAllEvents() {
  const cookieStore = await cookies();

  if (!cookieStore.has("accessToken")) {
    redirect("/no-access");
  }

  const response = await fetch("http://localhost:4000/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return await response.json();
}

export async function getAllBlogPosts(): Promise<{ data: BlogPost[] }> {
  const res = await fetch("http://localhost:4000/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }

  return await res.json();
}

export async function getBlogPostById(id: string): Promise<BlogPost> {
  if (!id) throw new Error("Missing ID");
  if (!/^\d+$/.test(id)) throw new Error("Incorrect ID format");

  const response = await fetch(`http://localhost:4000/posts/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }

  return await response.json();
}