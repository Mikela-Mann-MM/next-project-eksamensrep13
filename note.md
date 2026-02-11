# Asynkron JavaScript – fetch, Promises og async/await

---

## Eksempel med `.then()`

```js
fetch("address")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(() => console.log("Færdig :)"));
Hvad sker der trin for trin?
1️⃣ fetch("address")
fetch er en asynkron funktion.

Det betyder:

Den returnerer ikke data med det samme

Den returnerer et Promise

JavaScript fortsætter med at køre, mens fetch arbejder i baggrunden

Hvad er et Promise?
Et Promise er et objekt, der repræsenterer en værdi, som bliver tilgængelig senere.

Et Promise kan være i tre tilstande:

Tilstand	Betydning
Pending	Operationen er stadig i gang
Resolved (fulfilled)	Operationen lykkedes
Rejected	Operationen fejlede
Mental model
Du bestiller en vare online og får en kvittering.

Kvitteringen = dit Promise

Varen kommer senere = resolved

Noget går galt = rejected

Du får altså et løfte om, at noget vil ske senere.

2️⃣ Første .then()
.then(response => response.json())
Når fetch bliver resolved, får vi et response-objekt.

Men:

response.json() er også asynkron

Den returnerer også et Promise

Derfor skal vi vente igen.

Det Promise indeholder den rigtige data i JavaScript-format.

3️⃣ Andet .then()
.then(data => console.log(data))
Her får vi den færdig-parsede JSON-data.

Nu kan vi bruge den.

4️⃣ .catch()
.catch(error => console.log(error))
Hvis noget fejler undervejs, fx:

Netværksfejl

Serveren svarer ikke

Promise bliver rejected

Så bliver fejlen fanget her.

5️⃣ .finally()
.finally(() => console.log("Færdig :)"))
finally kører uanset om det lykkes eller fejler.

Godt sted til:

Stoppe en loading spinner

Rydde op

Lukke forbindelser

Kort sagt
fetch() returnerer et Promise

.then() kører når Promise bliver resolved

.catch() kører hvis det bliver rejected

.finally() kører altid

Hvornår kom async/await?
async/await blev en officiel del af JavaScript i 2017 (ES2017 / ES8).

Det blev introduceret som en forbedring oven på Promises, fordi:

.then().then().then().catch()
hurtigt kan blive svært at læse i større programmer.

I dag er det standardmåden at håndtere asynkron kode på.

Samme fetch skrevet med async/await
async function getData() {
  try {
    const response = await fetch("address");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Færdig :)");
  }
}
Hvad sker der her?
1️⃣ async function
Når du skriver async foran en funktion:

Funktionen returnerer automatisk et Promise

Du må bruge await inde i den

2️⃣ await
await betyder:

Vent på at Promise bliver resolved, før du går videre.

Så i stedet for:

.then(response => response.json())
skriver vi:

const response = await fetch("address");
Koden bliver mere lineær og lettere at læse.

3️⃣ try/catch
try/catch erstatter .catch().

try → kode der kan fejle

catch → håndterer fejl

finally → kører altid

Hvorfor er async/await bedre?
Ikke fordi det er nyere — men fordi det:

Er lettere at læse

Minder om synkron kode

Gør komplekse flows mere overskuelige

Reducerer callback hell

Hvornår skal man stadig kende .then()?
Når:

Du arbejder med ældre kode

Du bruger libraries der returnerer Promises direkte

Du skriver funktionel chaining

Du bruger Promise.all(), Promise.race() osv.

Vigtigt at forstå
async/await er ikke en erstatning for Promises.

Det er syntaktisk sukker oven på Promises.

Under motorhjelmen er det stadig Promises, der styrer det hele.