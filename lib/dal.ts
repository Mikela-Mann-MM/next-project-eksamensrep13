"use server"; 

// dette indikerer at koden i denne fil skal køres på serveren, og ikke i browseren. Det er vigtigt, fordi vi bruger server-side funktioner som cookies og redirect, som ikke er tilgængelige i klienten. 
// Ved at markere filen som "server" sikrer vi, at disse funktioner fungerer korrekt og ikke forårsager fejl i browseren.


// dal data access layer, bruges til at håndtere dataadgang 
// og forretningslogik i en applikation. Det fungerer som et lag mellem 
// applikationens forretningslogik og datakilden, hvilket gør det lettere at 
// vedligeholde og teste koden. I en Next.js-applikation kan dal bruges til at 
// organisere kode, der interagerer med databaser, API'er eller andre datakilder, 
// og det hjælper med at holde komponenterne rene og fokuserede på præsentationslogik.


import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import type { BlogPost } from "@/types/blogpost";


//use server og async er kravet for at kunne kalde det en server action, og dermed kunne bruge det i en server komponent. 
// I dette tilfælde er getAllEvents en server action, fordi den er markeret med "use server" og er en asynkron funktion, der udfører server-side logik, herunder håndtering af cookies og omdirigering.
//man må ikke have en synkron server action.

// vs et server component (måske også kører asyncront), som er en React-komponent, der også kører på serveren. Serverkomponenter kan også bruge server-side funktioner og logik, 
// men de er ikke markeret med "use server" og kan derfor ikke kalde server-side funktioner direkte uden at bruge en server action.
// og de skal returnere JSX eller null, som kan renderes i browseren, mens en server action kan returnere data eller udføre handlinger uden at skulle returnere JSX.

type DALSuccess<T> = { success: true; data: T };
type DALError = { success: false; message: string; status?: number };
export type DALResult<T> = DALSuccess<T> | DALError;

function toErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

/**
 * Central fetch-helper til DAL:
 * - tjekker response.ok
 * - tjekker at det er JSON
 * - forsøger at give brugbar fejlbesked
 */
async function fetchJson<T>(url: string, init?: RequestInit): Promise<DALResult<T>> {
  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      // Prøv at hente serverens fejltekst (hvis der er en)
      const text = await res.text().catch(() => "");
      return {
        success: false,
        status: res.status,
        message: text || res.statusText || "Request failed",
      };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return {
        success: false,
        message: "Response is not JSON",
      };
    }

    const data = (await res.json()) as T;
    return { success: true, data };
  } catch (error) {
    console.log("fetchJson error", error);
    return {
      success: false,
      message: "Something went wrong on the server, try again later",
    };
  }
}

export async function getAllEvents(): Promise<DALResult<unknown[]>> {
  const cookieStore = await cookies();

  if (!cookieStore.has("accessToken")) {
    redirect("/no-access");
  }

  return fetchJson<unknown[]>("http://localhost:4000/events");
}

export async function getAllBlogPosts(): Promise<DALResult<{ data: BlogPost[] }>> {
  return fetchJson<{ data: BlogPost[] }>("http://localhost:4000/posts");
}

export async function getBlogPostById(id: string): Promise<DALResult<BlogPost>> {
  // Validering først (hurtig feedback)
  if (!id) {
    return { success: false, message: "Missing ID" };
  }
  if (!/^\d+$/.test(id)) {
    return { success: false, message: "Incorrect ID format" };
  }

  try {
    const res = await fetch(`http://localhost:4000/posts/${id}`);

    if (res.status === 404) {
      notFound(); // Next.js håndterer 404-side (kaster internt)
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        success: false,
        status: res.status,
        message: text || "Failed to fetch blog post",
      };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return { success: false, message: "Response is not JSON" };
    }

    const post = (await res.json()) as BlogPost;
    return { success: true, data: post };
  } catch (error) {
    console.log("getBlogPostById Error", error);
    return {
      success: false,
      message: "Something went wrong on the server, try again later",
    };
  }
}

//console.log vs sentry.io i prod miljø 

// kode fra stackoverflow
