

import Link from "next/link";

export default function NoAccessPage() {
    return (
        <main>
            <h1 className="text-red-400 uppercase text-8xl">Du har ikke adgang til denne side</h1>
            <p>Du skal være logget ind for at se dette indhold.</p>
            <Link href="/login" className="text-blue-500 underline">Gå til login</Link>
        </main>
    );
}