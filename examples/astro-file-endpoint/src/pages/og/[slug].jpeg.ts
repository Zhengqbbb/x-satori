import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content'
import { getPostImageBuffer } from '../../og'

export async function getStaticPaths() {
    const posts = await getCollection('blog')

    return posts
        .map(post => ({
            params: { slug: post.id },
            props: { ...post },
        }))
}

export const GET: APIRoute = async ({ props }) => {
    const body = await getPostImageBuffer(props as CollectionEntry<'blog'>)
    return new Response(new Uint8Array(body), {
        headers: { 'Content-Type': 'image/jpeg' },
    })
}
