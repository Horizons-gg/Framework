import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Theme from '@assets/themes/dark'
import * as Material from '@mui/material'

import { useSpring, animated } from 'react-spring'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import StatsSection from '@components/sections/stats'
import SE from '@components/sections/spaceEngineers'
import Footer from '@components/footers'

import * as Images from '@assets/images'


const Home: NextPage = () => {

    return (
        <div className='h-screen bg-slate-900'>
            <Material.ThemeProvider theme={Theme}>

                <Head>
                    <title>Horizons</title>
                </Head>


                <div className="fixed z-50 p-5 m-auto w-screen right-10">
                    <nav className="hidden space-x-8 text-sm font-medium md:flex justify-end">
                        <a className="text-gray-100" href="">Statistics</a>
                        <a className="text-gray-100" href="">Patreon</a>
                        <a className="text-gray-100" href="">Projects</a>
                        <a className="text-gray-100" href="">Contact</a>
                    </nav>
                </div>


                <Parallax pages={4}>
                    <ParallaxLayer offset={0} speed={0.2} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/5.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0.4} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/4.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.15} factor={1}>
                        <div className='flex justify-center h-screen' style={{marginTop: -250}}>
                            <div className='m-auto mx-10'>
                                <Image src={Images.Logo} priority={true} height={80} width={600} />
                            </div>
                        </div>
                    </ParallaxLayer>


                    <ParallaxLayer offset={0} speed={0.6} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/3.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0.8} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/2.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0.08} speed={1} factor={2}
                        style={{
                            backgroundImage: `url('/images/landing/1.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >

                    </ParallaxLayer>

                    <ParallaxLayer offset={1} speed={1} factor={1}>
                        <div className="p-5 m-auto w-auto">
                            <StatsSection />
                        </div>
                    </ParallaxLayer>



                    {/* <ParallaxLayer offset={0} speed={1} factor={1}>
                        <div className="flex my-5 mx-10 md:block justify-center">
                            <Image src={Images.Logo} priority={true} height={40} width={300} />
                        </div>
                    </ParallaxLayer> */}
                </Parallax>

            </Material.ThemeProvider>
        </div>
    )

}

export default Home