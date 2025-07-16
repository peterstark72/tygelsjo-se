import {defineQuery} from 'next-sanity'

export const ARTICLE_INDEX_QUERY = defineQuery(`*[_type=="article"]{title,slug,ingress,main,darrad,published} | order(published desc)`)

export const ARTICLE_INDEX_SITEMAP_QUERY = defineQuery(`*[_type=="article"]{slug, _updatedAt}`)

export function ARTICLE_QUERY(slug: string) {
    return defineQuery(`*[_type=="article" && slug.current == "${slug}"]{..., authors[]->{...}, related[]->{...}}`)
}

export const EVENT_INDEX_QUERY = defineQuery(`*[_type=="event"]{_id, name, start, end, description, link, place->{...}} | order(start asc)`)