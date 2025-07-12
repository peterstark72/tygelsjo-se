import { MetadataRoute } from 'next'

import {ARTICLE_INDEX_SITEMAP_QUERY} from '@/sanity/lib/queries'
import {client} from '@/sanity/lib/client'
import {ArticleType} from '@/sanity/lib/types'

/**
 * Generates a sitemap for the website.
 * 
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap containing URLs and metadata.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseURL = 'https://tygelsjo.se'
    const articles: ArticleType[] = await client.fetch(ARTICLE_INDEX_SITEMAP_QUERY)

    const sm : MetadataRoute.Sitemap = articles.map((a : ArticleType)=> {
        return {
            url: [baseURL, 'artiklar', a.slug.current].join('/'),
            lastModified: a._updatedAt,
            changeFrequency: 'monthly',
            priority: 1
        }
    })
    sm.push({
        url: 'https://tygelsjo.se/',
        lastModified: (new Date()).toISOString(),
        changeFrequency: 'weekly',
        priority: 1
    })
    sm.push({
        url: 'https://tygelsjo.se/kungorelser',
        lastModified: (new Date()).toISOString(),
        changeFrequency: 'daily',
        priority: 1
    })

    return sm
}



