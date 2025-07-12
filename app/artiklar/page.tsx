import { client } from "@/sanity/lib/client"
import { ARTICLE_INDEX_QUERY } from "@/sanity/lib/queries"
import Link from "next/link"

import styles from "./page.module.css"
import { ArticleType } from "@/sanity/lib/types"

export default async function Page() {

    const articles: ArticleType[] = await client.fetch(ARTICLE_INDEX_QUERY)

    return (
        <div className={styles.page}>
            <h1>Artiklar</h1>
            <ol>
            {articles.map((article: ArticleType) => (
                <li key={article.slug.current}>
                    <Link href={`/artiklar/${article.slug.current}`}>
                    <h3>{article.title}</h3>
                    <p>{article.ingress}</p>
                    <p><em>{article.published}</em></p>
                    </Link>
                </li>
            ))}
            </ol>
        </div>
    )   
}