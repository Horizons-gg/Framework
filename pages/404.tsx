import type { NextPage } from 'next'
import Head from 'next/head'


const NoPageFoundPage: NextPage = () => {

    return (

        <div className='bg-slate-900 flex h-screen justify-center'>
            <span className='text-slate-100 text-8xl font-bold m-auto'>Nothing Here, Go Away</span>
        </div>

    )
}

export default NoPageFoundPage