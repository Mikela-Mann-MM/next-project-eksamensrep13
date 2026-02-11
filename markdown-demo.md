# overskrift 1
## overskrift 2
### overskrift 3

lorem ipsum dolor sit amet.

lorem ipsum 

-punkt1  
-punkt2  
-punkt3

den tekst er **fed**

Denne tekst er *kursiv*

Denne tekst er ***både fed og kursiv***

[Dette er et link](.components/LoginForm/action.ts)

[Google](https://google.com)

[Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet)

![Billede af en killing](https://kattesele.dk/wp-content/uploads/2023/05/soed-kattekilling.jpg)

Dette er et inline `<p></p>`kode. 

```
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

