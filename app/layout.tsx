import "./global.css";
import styles from './layout.module.css';
import { Metadata, Viewport } from 'next'
import { Newsreader } from "next/font/google";
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link';
import { GoogleTagManager } from '@next/third-parties/google'

const newsReaderSerif = Newsreader({
    variable: "--font-newsreader-serif",
    weight: ['200', '300', '400', '700'],
    subsets: ['latin'],
})

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Tygelsjö, Malmö",
    image: "/opengraph-image.png",
    description: "Allt om Tygelsjö och Västra Klagstorp, Malmö",
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    metadataBase: new URL('https://tygelsjo.se'),
    title: {
        template: '%s | Tygelsjö, Malmö',
        default: 'Tygelsjö, Malmö', // a default is required when creating a template
    },
    description: 'Webbsida för historisk information om Tygelsjö och Västra Klagstorp i Malmö.',
    verification: {
        other: {
            'google-adsense-account': 'ca-pub-9308224034018185'
        }
    }
}


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sv">
            <head>
                <GoogleTagManager gtmId="GTM-TPDF7SL" />
  
                <Script id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                ></Script>
            </head>
            <body className={`${newsReaderSerif.variable}` + " " + styles.body  }>
                <header className={styles.topbar}>
                <nav>
                    <Link href="/">
                        <figure>
                            <Image src="/icon.png" alt="Tygelsjö, Malmö" width={64} height={64} />
                        </figure>
                        <h1 className={styles.title}>Tygelsjö & Västra Klagstorp, Malmö.</h1>
                    </Link>
                </nav>
                <nav className={styles.nav}>
                    <h1><Link href="/artiklar">Artiklar</Link></h1>
                    <h1><Link href="/kalendarium">Kalendarium</Link></h1>
                </nav>
                <nav className={styles.nav}>
                    <Link href="https://www.facebook.com/tygelsjo/">
                        <figure><Image src="/social-media.svg" alt="Link" width={64} height={64} /></figure>
                    </Link>
                </nav>
                </header>
                <main className={styles.main}>
                {children}
                </main>
                <footer className={styles.footer}>© 2025 Peter Stark. Alla rättigheter förbehållna. Webbsidan är byggd i Tygelsjö. Källkoden är öppen på <Link href="https://github.com/peterstark72/tygelsjo-se">Github</Link>.</footer>
            </body>

        </html>
    );
}
