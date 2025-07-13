import styles from "./page.module.css";
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { ARTICLE_INDEX_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { ArticleType } from "@/sanity/lib/types";


function ArticleCard(article: ArticleType) {
	const articleUrl = `/artiklar/${article.slug.current}`
	return (
		<div className={styles.card}>
			<Link href={articleUrl}>
				<figure>
					<Image
						src={urlFor(article.main).width(512).height(256).url()}
						width={512}
						height={256}
						alt={article.main.caption} />
				</figure>
				<section>
					<h6>{article.darrad}</h6>
					<h3>
						{article.title}
					</h3>
					<p>{article.ingress}</p>
					<p>{article.published}</p>
				</section>
			</Link>
		</div>
	)
}

export default async function Home() {

	const articles: ArticleType[] = await client.fetch(ARTICLE_INDEX_QUERY);

	return (
		<div className={styles.page}>

			<header className={styles.header}>
				<div className={styles.title}>
					<h1>Tygelsjö<br />& Västra Klagstorp</h1>
					<blockquote className={styles.blockquote}>
					Tygelsjö utgör ett härligt slätland som sakta sluttar ned mot havet, och som från söder mot norr genomskärs av motorvägen från Trelleborg, Vellinge och Höllviken. Det hela visar sig för ögat såsom ett frukbart sädesland som, långt ifrån att vara enformigt, tvärtom som följd av den allmänna pilplanteringen i alla vallar och diken mer har utseendet av en stor trädgård än av ett vanligt åkerland.
					</blockquote>
					<p>- Från Georg Gustafsson sockenbeskrivning 1850-talet.</p>					
				</div>

				<div className={styles.about}>
					<p>
					Denna sida handlar om Tygelsjö och Västra Klagstorp, två orter i den sydvästraste delen av Malmö kommun i Skåne län. Här hittar du artiklar, bilder och information om byarnas historia, kultur och samhälle.
					</p>
					<p>
					Sida är skapad av Peter Stark, som bor i Tygelsjö. Om du har frågor eller vill bidra med material, kan du kontakta Peter via <Link href="https://www.instagram.com/tygelsjo.se/">@tygelsjo.se</Link> (Instagram). 
					</p>
				</div>

			</header>

			<main className={styles.main}>
				{articles.map((article: ArticleType) => {
					return (
						<ArticleCard {...article} key={article.slug.current} />
					)
				})}
			</main>

		</div>
	);
}
