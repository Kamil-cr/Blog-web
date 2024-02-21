import React from 'react'
import Image from 'next/image'
import img from "../../public/medium-m.png"
const Hero = () => {
  return (
    <div className='flex justify-between items-center lg:mx-9 lg:h-[500px] bg-yellow-400 border-y border-black py-10 lg:py-0 '>
        <div className='px-10 space-y-5'>
            <h1 className="max-w-xl text-6xl font-serif"><u>Medium</u> is a place to write read and connect</h1>
            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </h2>
        </div>
        <Image src={img} alt="hero" className='hidden md:inline-flex w-64 lg:w-auto h-64 lg:h-full' />
    </div>
  )
}

export default Hero