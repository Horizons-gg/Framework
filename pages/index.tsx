import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Theme from '@assets/themes/dark'
import * as Material from '@mui/material'

import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import StatsSection from '@components/sections/stats'
import Footer from '@components/footers'

import * as Images from '@assets/images'


const Home: NextPage = () => {

    return (
        <div className='h-screen bg-slate-900'>
            <Material.ThemeProvider theme={Theme}>

                <Head>
                    <title>Horizons</title>
                </Head>


                <Parallax pages={4}>

                    <ParallaxLayer offset={0} speed={1} factor={1}>
                        <div className='h-screen blur-sm' style={{ margin: '-10px -10px', backgroundImage: `url('/images/landingImage.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className='bg-black/30 h-screen w-screen' />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0} speed={1} factor={1}>
                        <div className="flex my-5 mx-10 md:block justify-center">
                            <Image src={Images.Logo} priority={true} height={40} width={300} />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0} speed={1} factor={1} sticky={{ start: 0, end: 4 }}>
                        <div className="p-5 m-auto w-auto">

                            <nav className="hidden space-x-8 text-sm font-medium md:flex justify-center">
                                <a className="text-gray-100" href="">Statistics</a>
                                <a className="text-gray-100" href="">Patreon</a>
                                <a className="text-gray-100" href="">Projects</a>
                                <a className="text-gray-100" href="">Contact</a>
                            </nav>

                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0.99} speed={1.5} factor={1}>
                        <StatsSection />
                    </ParallaxLayer>

                </Parallax>

            </Material.ThemeProvider>
        </div>
    )

}

export default Home