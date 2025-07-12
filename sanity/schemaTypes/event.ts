// schemas/event.ts
export default {
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'start',
        type: 'datetime',
        title: 'Start time'
      },
      {
        name: 'end',
        type: 'datetime',
        title: 'End time'
      },
      {
        name: 'location',
        type: 'geopoint',
        title: 'Location'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description'
      },
      {
        name: 'link',
        type: 'url',
        title: 'Link'
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{type: 'string'}]
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image'
      }
    ]
  }
