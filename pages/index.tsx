//? Next

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Montserrat } from '@next/font/google'



//? React Spring

import { useSpring, animated } from '@react-spring/web'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'



//? Images



//? Fonts

const Montserrat_Standard = Montserrat({ weight: '400', subsets: ['latin'] })



//? Components

import AnimatedLogo from '@/components/logo'
import ScrollIcon from '@/components/svg/scroll'





export default function Home() {
    return (
        <>
            <Head>
                <title>Horizons</title>
                <meta name='description' content='Horizons Description...' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={`${Montserrat_Standard.className} text-white`}>

                <div className="fixed z-50 p-5 m-auto w-screen top-3 right-10">
                    <nav className="hidden space-x-8 text-sm font-medium sm:flex justify-end">
                        <p className="text-gray-100 hover:text-gray-300 transition-all"><Link href={"https://github.com/ItsKodas"} target='_blank'>Projects</Link></p>
                        <p className="text-gray-100 hover:text-gray-300 transition-all"><Link href={"https://www.patreon.com/join/corehorizons"} target='_blank'>Patreon</Link></p>
                        <p className="text-gray-100 hover:text-gray-300 transition-all"><Link href={"https://discord.gg/horizons"} target='_blank'>Join</Link></p>
                    </nav>
                </div>


                <Parallax pages={2}>

                    <ParallaxLayer offset={0} speed={0.1} factor={2}
                        style={{
                            backgroundImage: 'url(/parallax/sky.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.2} factor={2}
                        style={{
                            backgroundImage: 'url(/parallax/mountainsFar.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.005} factor={1}>
                        <div className='-mt-32'>
                            <AnimatedLogo screenHeight />
                        </div>
                    </ParallaxLayer>


                    <ParallaxLayer offset={0} speed={0.5} factor={2}
                        style={{
                            backgroundImage: 'url(/parallax/mountainsFar2.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.6} factor={2}
                        style={{
                            backgroundImage: 'url(/parallax/lake.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={1} factor={2}
                        style={{
                            backgroundImage: 'url(/parallax/trees.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />







                    {/* <ParallaxLayer offset={1} speed={0.5} factor={1}>
                        <svg viewBox="0 0 100 100">
                            <polygon
                                points='50 15, 100 100, 0 100'

                                style={{
                                    fill: 'transparent',
                                    stroke: 'white',
                                    strokeWidth: 1
                                }}
                            />

                        </svg>
                    </ParallaxLayer> */}

                </Parallax>






            </main >

        </>
    )
}
