import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "../../sanity/lib/image";
import { IPost } from "@/Interfaces/posts_interface";
import Link from "next/link";

interface Props {
  posts: [IPost];
}

export default async function Home() {
  const query = `*[_type == "post"]{
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
  }`;
  const posts: IPost[] = await client.fetch(query);

  return (
    <main>
      <Hero />
      <Blog post={posts}/>
      page
    </main>
  );
}

// export const getServerSideProps = async () => {
//   const query = `*[_type == "post"]{
//     _id, 
//     _createdAt,
//     title,
//     author-> {
//         name,
//         image
//     },
//     mainImage,
//     "slug": slug.current,
//     body,
//   }`;

//   const posts = await client.fetch(query);

//   return {
//     props: {
//       posts,
//     },
//   };
// }