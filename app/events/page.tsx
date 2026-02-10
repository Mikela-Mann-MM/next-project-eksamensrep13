

import { getAllEvents } from "@/lib/dal";

export default async function EventsPage() {
    const events = await getAllEvents();
    

    return (
        <main>
            <h1>Events</h1>
            <ul>
                {events.data.map((event: any) => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </main>
    );
}       

//en funktions hoved opgave er at tage imod input bearbejde det input og komme med et output
// I dette tilfælde er inputet implicit, da det kommer fra getAllEvents funktionen, som henter data fra en ekstern kilde (en API).
// await - vi afventer promiset fra getAllEvents, hvilket betyder, at vi venter på, at dataene er hentet, før vi fortsætter med at renderere komponenten.
// jeg kører funktionen - funktionen returnere noget - det gemmer jeg i en variabel invokering() - eksekvere funktionen. 