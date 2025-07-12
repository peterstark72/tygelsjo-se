import { Firestore, Filter,  QuerySnapshot, Timestamp} from '@google-cloud/firestore';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';

const seLocale = new Intl.Locale("sv-SE")

const db = new Firestore({
    projectId: 'tygelsjo-se',
    keyFilename: './tygelsjo-se-a3f95eca469a.json',
});


type AnnouncementType = {
    kungorelseid: string;
    kungorelsetyp: string;
    address: string;
    postort: string;
    stadsdel: string;
    publiceringsdatum: Timestamp; // Firestore Timestamp
    latlng: [number, number]; // [latitude, longitude]
    url: string;
}

export const metadata: Metadata = {
    metadataBase: new URL('https://tygelsjo.se'),
    title: "Kungörelser enligt plan- och bygglagen, Tygelsjö i Malmö",
    description: 'Kungörelser enligt plan- och bygglagen, Tygelsjö i Malmö',
    verification: {
        other: {
            'google-adsense-account': 'ca-pub-9308224034018185'
        }
    }
}


function AnnouncementCard(item: AnnouncementType) {
    
    /*
    if (!item.publiceringsdatum || !item.address || !item.postort || !item.stadsdel) {
        return null;
    }
        */
    const d = item.publiceringsdatum.toDate();

    return (
        <tr className={styles.item} key={item.kungorelseid}>
            <th><Link href={`https://www.google.com/maps?q=${item.latlng[0]},${item.latlng[1]}`}>{item.address}</Link></th> 
            <td>{item.kungorelsetyp}</td> 
            <td>{item.postort}</td> 
            <td>{item.stadsdel}</td> 
            <td>{d.toLocaleDateString(seLocale)}</td>
            <td><Link href={item.url}>{item.kungorelseid}</Link></td>
        </tr>
    )
} 


async function Announcements() {
    
    const announcementsRef = db.collection("kungorelser");
    const andFilter = Filter.and(Filter.where('address', '!=', ''));
    const orFilter = Filter.or(Filter.where('stadsdel', '==', 'Väster'), Filter.where('postort', '==', 'Tygelsjö'), Filter.where('postort', '==', 'Västra Klagstorp'));
    const response : QuerySnapshot = await announcementsRef.where(andFilter).where(orFilter).orderBy('publiceringsdatum', 'desc').limit(100).get();

    if (response.empty) {
        return null;
    } 

    const announcements : AnnouncementType[] = response.docs.map(doc => doc.data() as AnnouncementType);
    if (announcements.length === 0) {
        return null;
    } 
    return (
        <div className={styles.items}>
        <table>
        <tbody>
            {announcements.map(AnnouncementCard)}
        </tbody>
        <caption>Kungörelserna hämtas från Post- och Inrikes Tidningen (POIT). Endast de som berör Malmö Väster, Tygelsjö och Västra Klagstorp hämtas. 
            Syftet är att ge boende i området enkel tillgång till uppdateringar enligt plan- och bygglagen. </caption>
        </table>
        </div>
    )
  }


export default async function Page() {
  return (
    <div className={styles.page}>
      <h1>Kungörelser enligt plan- och bygglagen</h1>
      <p>Här hittar du bygglov, marklov, och rivningslov inom Tygelsjö och Västra Klagstorp. 
        Samtliga kungörelser publiceras av Bolagsverket i Post- och Inrikes Tidningar (Sveriges äldsta).
        </p>
        <p>
            För att läsa kungörelserna i sin helhet eller begära handlingar, besök <Link href="https://poit.bolagsverket.se/poit-app/">Post- och Inrikes Tidningar (Bolagsverket.se)</Link>.
        </p>

      <Announcements />
    </div>
  );
}