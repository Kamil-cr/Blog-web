import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import img from "../../public/img.png"

const Header = () => {
  return (
    <nav className='lg:px-14 px-8 flex h-20 border justify-between'>
        <div className='flex space-x-2 lg:space-x-5 items-center'>
            <Link href="/">
                <Image src={img} alt="logo" className='w-48' />
            </Link>
            <button className='hidden md:flex'>About</button>
            <button className='hidden md:flex'>Contact</button>
            <button className='lg:px-5 px-4 hidden md:flex text-white py-1 rounded-full bg-green-600'>Follow</button>
        </div>
        <div className='flex space-x-3 lg:space-x-6 items-center'>
            <button className='text-green-600'>Sign In</button>
            <button className='text-green-600 border border-green-600 px-3 py-1 rounded-full'>Get Started</button>
        </div>
    </nav>
  )
}

export default Header