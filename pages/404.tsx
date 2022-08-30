import type { NextPage } from 'next'
import Link from 'next/link'

const NoPageFoundPage: NextPage = () => {

    return (

        <Link className='bg-slate-900 flex h-screen justify-center' href='/'>
            <span className='text-slate-100 text-8xl font-bold m-auto hover:text-pink-500 transition-all hover:cursor-pointer'>Nothing Here, Go Away</span>
        </Link>

    )
}

export default NoPageFoundPage