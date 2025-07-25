import { PortableTextBlock } from '@portabletext/types';

export type EventType = {
    _id: string;
    name: string;
    start: string;
    end: string;
    place: {
        name: string;
        website: string;
        location: {
            lat: number;
            lng: number;
        }
    };
    description: string;
    link: string;
    image: AssetType;
}

export type AuthorType = {
    _id: string;
    _type: 'author';
    _updatedAt: string;
    name: string;
    bio: string;
}


export type AssetType = {
    asset: {
        _type: 'reference';
        _ref: string;
    };
    _type: 'image';
    _updatedAt: string;
    _id: string;
    caption: string;
}


// types/article.ts
export type ArticleType = {
    _id: string;
    _type: 'article';
    _updatedAt: string;
    _createdAt: string;
    title: string;
    ingress: string;
    darrad: string;
    main: AssetType;
    authors: AuthorType[];
    published: string;
    related: ArticleType[];

    slug: { current: string };
    body: PortableTextBlock[];
};