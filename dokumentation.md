# Brians Ostebiks
Brian Emilius, WU13

## Tech stack 

- Next.js
- REST API
- Tailwind
- Typescript 

## Kodeeksempel 

```javascript
"use server"; 

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
```
(Hvad er det?) Dette er en funktion, som er en server action
(Hvad er formålet?)
Formålet er at hente data fra et API og returnere dataen
(Hvordan sker det?) 
Jeg briger `fetch`-API'et (dette skal ikke med i dokumentationen - note to self: Aplication Programming Interface (en brugergrænseplade til at programmere et interface)) til at lave en HTTP Request til web-API'et og jeg har lavet en guard clause i toppen af funktionen, som tjekker om `accesToken`-cookien findes. 

(måske gå i detaljer med et enkelt element fra eksemplet herefter) 

max 5 sider her 