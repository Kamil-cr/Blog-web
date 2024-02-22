import React from 'react'
import Image from 'next/image'
import { client } from '../../../../sanity/lib/client'
import { groq } from 'next-sanity'
import { IPost } from '@/Interfaces/posts_interface'
import { GetStaticPaths } from 'next'
import { urlForImage } from "../../../../sanity/lib/image"
import PortableText from 'react-portable-text'
import Link from 'next/link'

interface params {
    params: {
        slug: string
    }
}

const post = async ({ params }: params) => {
    const query = `*[_type == "post" && slug.current == "${params.slug}"][0]{
    _id, 
    _createdAt,
    title,
    author-> {
        name,
        image
    },
    mainImage,
    "slug": slug.current,
    body,
    _updatedAt
    }`
    
    const post: IPost = await client.fetch(query)
    
  return (
    <div>
      <Image src={urlForImage(post.mainImage)} alt={post.title} className='w-full object-cover h-40' width={200} height={100}/>  
    
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <div className='flex items-center space-x-5'>
          <Image src={urlForImage(post.author.image)} alt={post.author.name} height={40} className='h-10 w-10 rounded-full' width={40}/>
          <p className='font-extralight font-sm'>
            Blog Post by <span className='font-bold '>{post.author.name}</span> - published
            at {" "} {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText 
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} 
          content={post.body}
          serializers={{
            h1: (props: any) => {
              return <h1 className='text-2xl font-bold my-5' {...props} />
            },
            h2: (props: any) => {
              return <h2 className='text-xl font-bold my-5' {...props} />
            },
            p: (props: any) => {
              return <p className='my-5' {...props} />
            },
            li: (props: any) => {
              return <li className='list-disc ml-4' {...props} />
            },
            link: ({href, children}: any) => {
              <Link href={href} className='hover:underline text-blue-400'>
                {children}
              </Link>
            }
          }}
          />
        </div>
      </article>
    </div>
  )
}

export default post

// export const getStaticPaths = async () => {
//     const query = `*[_type == "post"]{
//     slug {
//       current
//     }
//     }`
    
//     const posts: IPost[] = await client.fetch(groq`${query}`)
    
//     const paths = posts.map((post) => ({
//         params: { slug: post.slug.current },
//     }))
    
//     return { paths, fallback: 'blocking', revalidate: 60 }
// }