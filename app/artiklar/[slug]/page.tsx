import styles from './page.module.css'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'

import {client} from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {ARTICLE_QUERY, ARTICLE_INDEX_QUERY} from '@/sanity/lib/queries'
import { ArticleType, AuthorType, AssetType } from '@/sanity/lib/types'

export const revalidate = 60

export const dynamicParams = true

type Params = Promise<{ slug: string }>

function renderImage({value}: {value: AssetType}) {
    return (
        <figure>
            <Image src={urlFor(value).width(1600).url()} width={1600} height={800} alt=""/>
            <figcaption>{value.caption}</figcaption>
        </figure>
    )
}


const myPortableTextComponents = {
    types: {image: renderImage}
}

export async function generateStaticParams() {
    const query = ARTICLE_INDEX_QUERY
    const result: ArticleType[] = await client.fetch(query)
   
    return result.map((post: ArticleType) => ({
      slug: post.slug.current,
    }))
  }  

export async function generateMetadata({ params }: { params: Params }) {
    const {slug} = await params
    const query = ARTICLE_QUERY(slug)
    const result: ArticleType[] = await client.fetch(query)
    return {
        title: result[0].title,
        openGraph: {
            title: result[0].title,
            description: result[0].ingress,
            type: 'article',
            locale: 'sv_SE',
            url: `https://www.tygelsjo.se/artiklar/${result[0].slug.current}`,
            images: [{
                url: urlFor(result[0].main).width(1200).height(630).url(),
                width: 1200,
                height: 630,
                alt: result[0].title
            }],
            }
        }
}
    


async function Article({doc}:{doc:ArticleType}) {

  const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: doc.title,
      image: urlFor(doc.main).width(1000).url(),
      description: doc.ingress
    }
    
  return (
      <article className={styles.article}>
          <Script id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <h6>{doc.darrad}</h6>
      <h1>{doc.title}</h1>
      <h3>{doc.ingress}</h3>
      <figure>
          <Image alt={doc.main.caption} src={urlFor(doc.main).width(1000).url()} width={1000} height={1000}/>
          <figcaption>{doc.main.caption}</figcaption>
          </figure>
      <section>
      <PortableText
          value={doc.body}
          components={myPortableTextComponents}
      />
      </section>
        <hr />
        <section className={styles.published}>
            <p>Publicerad: {new Date(doc._createdAt).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })}. Uppdaterad: {new Date(doc._updatedAt).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })}.</p>
        </section>
        <section className={styles.authors}>
          {doc.authors.map((doc: AuthorType) => (
            <p key={doc._id} className={styles.author}>
                Av {doc.name}. {doc.bio}
              </p>)
            )}
        </section>
     </article>
  )

}

function Aside({ related }: { related: ArticleType[] }) {
    if (!related || related.length === 0) {
        return null
    }
    return (
        <section className={styles.aside}>
            <ul>
                {related.map((article: ArticleType) => (
                    <li key={article.slug.current}>
                        <Link href={`/artiklar/${article.slug.current}`}>
                            <h3>{article.title}</h3>
                            <p>{article.ingress}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}



export default async function Page({ params }: { params: Params }) {
    const {slug} = await params
    const query = ARTICLE_QUERY(slug)
    const result = await client.fetch(query) as ArticleType[]

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Article doc={result[0]}  />
                <Aside related={result[0].related} />
            </div>
        </div>
    )
  }