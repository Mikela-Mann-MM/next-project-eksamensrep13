

"use client";

import NewEventAction from "./action";
import { useActionState } from "react";

export default function NewEventForm() {
    const [formState, formAction, isPending] = useActionState(NewEventAction, {});
    return (
        <form action={formAction}>
            <div>
                <label htmlFor="eventName">
                    <span>Event Name:</span>
                    <input type="text" id="eventName" name="eventName" required />
                </label>
                <span></span> {/* evt til fejlmeddelelser */}
            </div>

            <div>
                <label htmlFor="eventDate">
                    <span>Event Date:</span>
                    <input type="date" id="eventDate" name="eventDate" required />
                </label>
                <span></span> {/* evt til fejlmeddelelser */}
            </div>

            <div>
                <label htmlFor="eventImage">
                    <span>Billede</span>
                    <input type="file" id="eventImage" name="eventImage" required /> 
                </label>
                <span></span> {/* evt til fejlmeddelelser */}
            </div>

                <button type="submit">Opret</button>
            
        </form>
    );
}   