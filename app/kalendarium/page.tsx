import { EVENT_INDEX_QUERY } from '@/sanity/lib/queries';
import { EventType } from '@/sanity/lib/types';
import { client } from '@/sanity/lib/client';

import styles from './page.module.css';

export const revalidate = 3600 // 1 hour

const dateFormatOptions : Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Stockholm"
};

const dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat("sv-SE", dateFormatOptions)

export default async function Page() {

    const events: EventType[] = await client.fetch(EVENT_INDEX_QUERY);


    return (
        <div className={styles.page}>
            <h1>Kalendarium</h1>
            <p>Händelser i Tygelsjö och V Klagstorp.</p>
            <ul className={styles.events}>
                {events.map((event) => (
                    <li key={event._id}>
                        <p>{event.end != null ? dateTimeFormat.formatRange(new Date(event.start), new Date(event.end)) : dateTimeFormat.format(new Date(event.start))}</p>
                        <h2>{event.name}</h2>
                        <p>{event.place.name}</p>
                        <p>{event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}