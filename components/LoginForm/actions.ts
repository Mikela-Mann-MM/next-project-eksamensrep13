//denne action bruges kun til loginform og er derfor placeret i components/LoginForm, 
// da den ikke skal bruges andre steder. Hvis den skulle bruges flere steder, 
// ville det være bedre at placere den i lib/actions eller lignende.

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState } from "@/types/login";

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  console.log(email, password)

  const nextState: LoginState = {
    values: { email, password },
    errors: {},
  };

  // Validering
  if (!email) nextState.errors.email = "Email er påkrævet";
  if (!password) nextState.errors.password = "Password er påkrævet";

  if (Object.keys(nextState.errors).length > 0) {
    return nextState;
  }

  // Dummy login check (skift ud med DB/API senere)
  const ok = email === "admin@site.dk" && password === "1234";

  if (!ok) {
    return {
      values: { email, password: "" },
      errors: { form: "Forkert email eller password" },
    };
  }

/*   // Login success: cookie
  cookies().set("access_token", "demo-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 time
  }); */

  // Redirect efter login
  redirect("/dashboard");
}
