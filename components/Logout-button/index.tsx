

import { cookies } from "next/headers";
import LogoutAction from "./action";
import Link from "next/link";

export default async function LogoutButton() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("accessToken");

  return (
    <form action={LogoutAction}>
      {isLoggedIn ? (
        <button type="submit">Log ud</button>
      ) : (
        <Link href="/login">Log ind</Link>
      )}
    </form>
  );
}
