import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content'
import { getPostImageBuffer } from '../../og'

export async function getStaticPaths() {
    const posts = await getCollection('blog')

    return posts
        .map(post => ({
            params: { slug: post.slug },
            props: { ...post },
        }))
}

export const GET: APIRoute = async ({ props }) =>
    new Response(
        await getPostImageBuffer(props as CollectionEntry<'blog'>),
        {
            headers: { 'Content-Type': 'image/jpeg' },
        },
    )
