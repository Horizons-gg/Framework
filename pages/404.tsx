import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const NoPageFoundPage: NextPage = () => {

    return (
        <div style={{
            backgroundImage: `url('/images/landingImage.jpg')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Link href='/'>
                <a className='bg-slate-900 flex h-screen justify-center'>
                    <span className='text-slate-100 text-8xl font-bold m-auto hover:text-pink-500 transition-all hover:cursor-pointer'>404, Page Not Found</span>
                </a>
            </Link>
        </div>
    )
}

export default NoPageFoundPage