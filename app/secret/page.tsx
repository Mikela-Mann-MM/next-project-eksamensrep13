 

 import { cookies } from 'next/headers';
 import { redirect } from 'next/navigation'; 

export default async function SecretPage() {
    const cookieStore = await cookies();
    if (!cookieStore.has('accessToken')) {
        redirect('/no-access');
    } //hvis du kommer forbi proxien og ikke har en accessToken cookie, bliver du omdirigeret til no-access siden pga disse linjer.
    //  Det er en ekstra sikkerhedsforanstaltning, da proxien allerede skulle forhindre uautoriseret adgang. Proxy livrem og dette seler.
    
    return (
        <main>
            <h1 className="text-4xl font-bold">Dette er en super hemmelig side </h1>
            <p className="text-lg">This page is protected and only accessible to authenticated users.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolore distinctio exercitationem necessitatibus itaque. Repellat reprehenderit sed quo suscipit sit, perspiciatis tenetur voluptas rem. Nostrum quibusdam rem voluptates ut dolore tenetur velit sint expedita quae quod esse beatae hic unde, sapiente aut enim atque saepe possimus vitae. Ipsum eligendi quas deleniti aperiam aliquid sint pariatur, ea totam nesciunt praesentium. Explicabo, omnis quaerat. Sint nesciunt minus fuga veniam error sequi non expedita, commodi temporibus quis eos soluta eius modi quisquam facilis rerum eligendi ullam suscipit qui earum reiciendis est autem! Minima eveniet exercitationem ipsa cumque aut nemo quasi, minus optio porro accusamus nulla praesentium expedita est odit fugit iusto hic itaque. Possimus rem laboriosam repellat eveniet reiciendis illo, quisquam vel id magni atque voluptatibus. Adipisci repudiandae sed eum nobis possimus tempora molestiae neque? Ipsa deserunt perferendis nostrum asperiores eaque. Quod eum rem voluptas deleniti accusamus quidem quo ex repellat cupiditate hic, expedita consequatur delectus fuga, magnam accusantium minima nobis numquam sequi ullam illo. Voluptate exercitationem, perspiciatis quam, recusandae vel molestiae, voluptatem dicta quaerat dolorem dolorum nemo maiores eaque ab beatae commodi! Nulla vel laborum iusto, quaerat distinctio facere voluptatibus aliquam a deleniti quia modi maiores inventore vero earum quam deserunt. Maiores id nihil quasi quibusdam quis sint laboriosam tenetur dolore! Tempore nobis, quo quae blanditiis illo voluptas optio totam quos sit reiciendis quia doloribus labore. Nobis ipsam dignissimos necessitatibus eum soluta numquam aperiam eligendi, tempore commodi. Dolore quisquam quasi qui quo nemo nisi, vel debitis dolorem eum nihil eos eveniet similique quibusdam optio ut molestias esse repellendus. Tenetur commodi porro exercitationem, earum corporis error! Suscipit deleniti ullam consectetur eum ipsam ex iste! Quis deserunt dolorum, qui eum id dignissimos ratione quibusdam dolore tempora vitae voluptatum labore possimus optio illum esse numquam quas culpa, consequatur quam veritatis, itaque voluptates? Soluta ipsum libero facere voluptatibus, atque aliquid quam alias neque placeat repellat nemo repudiandae harum distinctio quisquam, illum tempore consequatur dolorem iusto quos fugiat maxime illo culpa! Repellat laboriosam excepturi eos architecto nisi quia minus saepe exercitationem, officia, sed fuga, illo deserunt eius at? Dignissimos unde id reiciendis quibusdam vero saepe sed labore quae ut beatae asperiores modi quas, nemo accusantium esse nesciunt, inventore maiores voluptatibus exercitationem aut vitae libero. Enim porro dolores hic! Temporibus nobis, modi perferendis eos repellat ipsa saepe explicabo voluptatibus consequatur! Totam rem exercitationem, blanditiis itaque dicta maxime distinctio sed voluptatem, molestiae esse assumenda non, doloremque fugit ea. Expedita ipsa, consequatur tenetur ea quaerat distinctio temporibus error repudiandae aut provident sequi itaque sapiente, vitae impedit illo qui. Voluptatem quos, nostrum ullam libero saepe hic non, architecto nam nihil ut minus quibusdam iste? Error delectus fugit placeat magni reiciendis consectetur ab praesentium eos at, aspernatur eius assumenda alias. Vero quod natus obcaecati impedit maiores ab, ipsam exercitationem esse, porro facilis velit illo eveniet dicta, odit sunt accusamus expedita fuga molestias magni voluptatum consequuntur veritatis aut voluptas! Odio rerum id, amet quisquam perferendis earum voluptatibus aut rem exercitationem vero dignissimos cumque sapiente iure dolorum optio beatae ipsam iste ipsum doloremque! Tempore!</p>
        </main> 
   );
}

//ikke alle cookies er accestoken, så det er vigtigt at tjekke for den specifikke cookie, 
// der indikerer en gyldig session eller autentificering. I dette tilfælde antager vi, 
// at 'accessToken' er den cookie, der bruges til at bekræfte, om brugeren er logget ind 
// og har adgang til den hemmelige side. Hvis denne cookie ikke findes, bliver brugeren 
// omdirigeret til en "no access" side, som informerer dem om, at de ikke har de nødvendige 
// rettigheder for at se indholdet.