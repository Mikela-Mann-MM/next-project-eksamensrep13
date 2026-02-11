

"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");  //hvad betyder det at slette en cookie, 2 ting value bliver slettet og MaxAge sat til 0, så dør cookien af sig selv. 
    cookieStore.delete("username");
    
    return redirect("/");
}
