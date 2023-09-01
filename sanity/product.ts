import { defineField } from "sanity";

export const product = {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'title',
            title: 'Product Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Product Description',
            type: 'string'
        },
        {
            name: "price",
            title: "Product Price",
            type: "number"
        },
        defineField({
            name: "image",
            title: "Image",
            type: "array",
            of: [
                {
                    name: "img",
                    type: "image",
                    title: "Image",
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'tagLine',
            title: "Product Tagline",
            type: "string",
        }),
        defineField({
            name: "category",
            title: "Product Category",
            type: "reference",
            to: [
                {
                    type: "category"
                }
            ]
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
        }),
    ]
}