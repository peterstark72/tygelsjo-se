import { EVENT_INDEX_QUERY } from '@/sanity/lib/queries';
import { EventType } from '@/sanity/lib/types';
import { client } from '@/sanity/lib/client';

import styles from './page.module.css';


const seLocale = new Intl.Locale("sv-SE")

export default async function Page() {

    const events: EventType[] = await client.fetch(EVENT_INDEX_QUERY);


    return (
        <div className={styles.page}>
            <h1>Kalendarium</h1>
            <p>This is the Kalendarium page.</p>
            <ul className={styles.events}>
                {events.map((event) => (
                    <li key={event._id}>
                        <p>{new Date(event.start).toLocaleString(seLocale, {timeStyle: "short", dateStyle: "full"})} - {new Date(event.end).toLocaleTimeString(seLocale, {timeStyle: "short"})}</p>
                        <h2>{event.name}</h2>
                        <p>{event.place.name}</p>
                        <p>{event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}