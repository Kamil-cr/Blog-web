import React from 'react'
import { client } from "../../sanity/lib/client"
import { IPost } from '@/Interfaces/posts_interface'
import { urlForImage } from '../../sanity/lib/image';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface IProps {
  post: IPost[];
}

const Blog = async ({post}: IProps) => {;
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6'>
      {
        post.map((post: IPost) => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div className='border rounded-lg overflow-hidden group flex flex-col items-center'>
              <Image src={urlForImage(post.mainImage)} 
                alt={post.title} 
                width={200} 
                height={100}
                className='w-full group-hover:scale-105 h-60 object-cover duration-200 ease-in-out transition-transform' 
              />
              <div className='flex justify-between p-5 bg-white'>
                <div className=''>
                  <h2 className='line-clamp-2 text-lg fond-bold'>{post.title}</h2>
                  <p className='text-sm'>{post.author.name}</p>
                </div>
                <Image src={urlForImage(post.author.image)} alt={post.author.name} height={48} width={48} className='h-12 w-12 rounded-full'/>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Blog