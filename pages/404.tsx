import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const NoPageFoundPage: NextPage = () => {

    return (
        <div className='h-screen overflow-hidden'>
            <div className='h-screen w-screen fixed flex justify-center select-none z-10'>
                <Link href='/'>
                    <a className='text-slate-100 text-8xl font-bold m-auto hover:text-stone-400 transition-all'>404, Page Not Found</a>
                </Link>
            </div>

            <div className='h-screen blur-sm scale-105' style={{ backgroundImage: `url('/images/landingImage.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
    )
}

export default NoPageFoundPage