import "./global.css";
import styles from './layout.module.css';
import { Metadata, Viewport } from 'next'
import { Newsreader } from "next/font/google";
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link';

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
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TPDF7SL');
        `}
                </Script>
                <Script id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                ></Script>
            </head>
            <body className={`${newsReaderSerif.variable}`}>
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
                </nav>
                <nav className={styles.nav}>
                    <Link href="https://www.facebook.com/tygelsjo/">
                        <figure><Image src="/social-media.svg" alt="Link" width={64} height={64} /></figure>
                    </Link>
                </nav>
                </header>
                {children}
                <footer className={styles.footer}>Byggd i Tygelsjö av Peter Stark.</footer>
            </body>
        </html>
    );
}
