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
async function fetchData(): Promise<Props> {
  "use server"
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

  const posts: Props = await client.fetch(query);
  return posts
}
export default async function Home() {

  const postss:Props = await fetchData()
  return (
    <main>
      <Hero />
      <Blog post={postss} />
      page
    </main>
  );
}
