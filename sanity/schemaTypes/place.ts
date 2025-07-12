export default {
    name: 'place',
    type: 'document',
    title: 'Place',
    fields: [
        {   
            name: 'name',
            type: 'string',
            title: 'Name'   
        },
        {
            name: 'placeId',
            type: 'string',
            title: 'Google Place ID'
        },
        {
            name: 'tags',
            type: 'array',
            title: 'Tags',
            of: [{type: 'string'}]
        },
    ]
}