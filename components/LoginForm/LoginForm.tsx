//useActionState bruges til at håndtere form state og server actions i en enkelt komponent. hook'et 
//giver et simpelt interface til at arbejde med formularer, herunder håndtering af indsendelser, 
//opdatering af state og visning af fejlmeddelelser, alt sammen uden behov for ekstra biblioteker eller kompleksitet.

"use client"; 
//dette skal overlades til klienten fordi vi bruger et hook fra react, 
// og hooks kan ikke bruges i serverkomponenter.

import { useActionState } from "react";
import { loginUser } from "@/components/LoginForm/actions";

type State = {
    values: { email: string; password: string };
    errors: Partial<Record<"email" | "password" | "form", string>>;
};

const initialState: State = {
    values: { email: "", password: "" },
    errors: {},
};

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState<State, FormData>(
        loginUser,
        initialState
    );

    return (
        //automatisk konverteret fra et get post til et post request, 
        // da der er en formData parameter i loginUser actionen. 
        // Hvis der ikke var en formData parameter, ville det være et get request 
        // og data ville blive sendt som query params. - så det er synligt i inspector og 
        // url, og ikke egnet til følsomme data som login info.

        <form action={formAction}> 
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" defaultValue={state.values.email} />
                {state.errors.email && <p>{state.errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" defaultValue={state.values.password} />
                {state.errors.password && <p>{state.errors.password}</p>}
            </div>

            {state.errors.form && <p>{state.errors.form}</p>}

            <button type="submit" disabled={isPending}>
                {isPending ? "Logger ind..." : "Log ind"}
            </button>
        </form>
    );
}
