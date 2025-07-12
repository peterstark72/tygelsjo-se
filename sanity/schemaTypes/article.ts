// schemas/article.ts
export const Author = {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [{
        name: 'name',
        type: 'string',
        title: 'Name'
    }, 
    {
        name: 'profilePicture',
        type: 'image',
        title: 'Profile picture',
        options: {
            hotspot: true
        }
    }]
}

const imageFields = [{
    name: 'caption',
    type: 'string',
    title: 'Caption'
}];

export const Article =  {
    name: 'article',
    type: 'document',
    title: 'Article',
    groups: [
      {
        name: 'seo',
        title: 'SEO',
      },
      {
        name: 'ingress',
        title: 'Ingress',
      },
      {
        name: 'body',
        title: 'Body',
      },

    ],
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        group: 'ingress'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        group: 'ingress'
      },
      {
        name: 'published',
        type: 'date',
        title: 'Published',
        group: 'ingress',
        options: {
            dateFormat: 'YYYY-MM-DD',
            calendarTodayLabel: 'Idag'
          }
      },
      {
        name: 'authors',
        type: 'array',
        title: 'Authors',
        group: 'ingress',
        of: [{type: 'reference', to: {type: 'author'}}]
      },
      {
        name: 'ingress',
        type: 'string',
        title: 'Ingress',
        group: 'ingress'
      },
      {
        name: 'darrad',
        type: 'string',
        title: 'Dårrad',
        group: 'ingress'
      },
      {
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [{type: 'block'}, {type: 'image', fields: imageFields}],
        group: 'body',
      },
      {
        name: 'main',
        type: 'image',
        title: 'Main',
        fields: imageFields,
        group: 'ingress',
      },
      {
        name: 'SEOName',
        type: 'string',
        title: 'SEO Name',
        group: 'seo'
      }      
    ]
}