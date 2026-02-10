// denne action bruges kun til loginform og er derfor placeret i components/LoginForm, 
// da den ikke skal bruges andre steder. Hvis den skulle bruges flere steder, 
// ville det være bedre at placere den i lib/actions eller lignende.

"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState, LoginValues } from "@/types/login";
import { loginSchema } from "@/lib/schemas";

/* 
dette er en server action, som håndterer login processen. 
Dette kan flyttes til lib hvis det skal bruges flere steder, men da det kun bruges i LoginForm, er det mere overskueligt at have det her.
Server actions er en ny feature i Next.js 13, som gør det muligt at håndtere server-side logik direkte i komponenter, uden behov for API-routes eller lignende. 
Det gør det nemt at håndtere ting som form submissions, autentificering, og andre server-side processer på en mere integreret måde.

const loginSchema = z.object({
  // z.email findes ikke i zod → email skal være en string().email()
  email: z.string().email("Ugyldig email"),
  password: z.string().min(4, "Password er påkrævet og skal være mindst 4 tegn"),
}); */

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {

  // cookies() kan give TS-type der ser readonly ud, men i server actions kan den sætte cookies.
  // Derfor type-cast så .set ikke fejler i TypeScript.
  const cookieStore = await cookies() 

  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  if (email === prevState.values.email && password === prevState.values.password) {
    return prevState; // ingen ændring, undgå unødvendig validering og API-kald
  }

  // Valider input via Zod
  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    // z.flattenError findes ikke → brug result.error.flatten()
    const fieldErrors = result.error.flatten().fieldErrors;
    console.log(fieldErrors);

    return {
      // FormData.get giver FormDataEntryValue | null, men din type forventer string.
      // Vi konverterer derfor til string her (minimal TS-tilpasning).
      values: { email: String(email ?? ""), password: String(password ?? "") },
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    return {
      values: { email: String(email ?? ""), password: String(password ?? "") },
      // din LoginErrors type har form: string (ikke string[])
      errors: { form: "Forkert email eller password" },
    };
  }

  const data: { access_token: string; name?: string | null } = await response.json();

  // cookieStore bruges til at sætte cookies i server actions, 
  // som så kan læses på klienten. 
  // Det returnerer et cookieStore objekt, som har en set metode til at sætte cookies.

  cookieStore.set("access_token", String(data.access_token ?? ""));
  cookieStore.set("username", String(data.name ?? ""));

  // Redirect efter login
  redirect("/");
}
