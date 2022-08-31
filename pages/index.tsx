import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import Theme from '@assets/themes/dark'
import * as Material from '@mui/material'

import { useSpring, animated } from 'react-spring'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SolidIcons from '@fortawesome/free-solid-svg-icons'

import ScrollIcon from '@components/svg/scroll'

import StatsSection from '@components/sections/stats'
import SE from '@components/sections/spaceEngineers'
import Footer from '@components/footers'

import * as Images from '@assets/images'



const Home: NextPage = () => {

    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {

        function handleWindowResize() {
            setWindowSize(getWindowSize())
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])



    const LogoSpring = useSpring({
        from: {
            opacity: 1,
            marginTop: 1000
        },

        to: {
            opacity: 1,
            marginTop: 0
        },

        delay: 200,

        config: {
            tension: 250,
            friction: 150
        }
    })

    const TranslateClouds = useSpring({
        from: {
            opacity: 1,
            marginLeft: -1000
        },

        to: {
            opacity: 1,
            marginLeft: 0
        },

        delay: 0,
        loop: false,

        config: {
            tension: 2,
            friction: 150
        }
    })

    function ShipTranslate() {
        if (typeof windowSize === 'undefined') return
        const Position = Math.floor(Math.random() * (windowSize.innerWidth - 5 + 1)) + 5
        return useSpring({
            from: {
                opacity: 1,
                marginTop: 800,

                marginLeft: Position
            },

            to: {
                opacity: 1,
                marginTop: -500,

                marginLeft: Position
            },

            delay: Math.floor(Math.random() * (3000 - 50 + 1)) + 50,
            loop: true,

            config: {
                tension: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
                friction: 300
            }
        })
    }


    return (
        <div className='h-screen bg-slate-900'>
            <Material.ThemeProvider theme={Theme}>

                <Head>
                    <title>Horizons</title>
                </Head>


                <div className="fixed z-50 p-5 m-auto w-screen right-10 select-none">
                    <nav className="hidden space-x-8 text-sm font-medium sm:flex justify-end">
                        <Link href={""}><a className="text-gray-100 hover:text-gray-300 transition-all">Statistics</a></Link>
                        <Link href={""}><a className="text-gray-100 hover:text-gray-300 transition-all">Patreon</a></Link>
                        <Link href={""}><a className="text-gray-100 hover:text-gray-300 transition-all">Projects</a></Link>
                        <Link href={""}><a className="text-gray-100 hover:text-gray-300 transition-all">Contact</a></Link>
                    </nav>
                </div>


                <Parallax pages={4}>
                    <ParallaxLayer offset={0} speed={1} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/sky.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0.02} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/stars.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0.05} factor={1}>
                        <animated.div style={TranslateClouds}>
                            <div className='h-screen' style={{
                                backgroundImage: `url('/images/landing/clouds.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }} />
                        </animated.div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0} speed={0.1} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/moon.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0.2} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/mountains.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.4} factor={1}>
                        <div className='h-screen overflow-hidden select-none'>
                            <animated.img src='/images/landing/ship.png' style={ShipTranslate()} />
                            <animated.img src='/images/landing/ship.png' style={ShipTranslate()} />
                            <animated.img src='/images/landing/ship.png' style={ShipTranslate()} />
                            <animated.img src='/images/landing/ship.png' style={ShipTranslate()} />
                            <animated.img src='/images/landing/ship.png' style={ShipTranslate()} />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0} speed={0.4} factor={1}
                        style={{
                            backgroundImage: `url('/images/landing/4.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />


                    <ParallaxLayer offset={0} speed={0.15} factor={1}>
                        <div className='flex justify-center h-screen select-none' style={{ marginTop: -250 }}>
                            <div className='m-auto mx-10'>
                                <animated.div style={LogoSpring}>
                                    <Image src={Images.Logo} priority={true} height={80} width={600} />
                                </animated.div>
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
                        <div className="p-5 m-auto w-auto h-screen">

                            {/* Desktop */}
                            <div className="hidden lg:block" style={{ marginTop: 1000, marginLeft: "10rem" }}>
                                <Material.Typography variant='h1' color={Theme.palette.text.primary} fontWeight={700} letterSpacing={15}>ABOUT THE COMMUNITY</Material.Typography>
                            </div>


                            {/* Mobile */}
                            <div className="relative lg:hidden h-screen flex justify-center text-center">

                                <div className='absolute bottom-60'>
                                    <ScrollIcon />
                                </div>

                                <div className='absolute -bottom-5'>
                                    <Material.Typography variant='h5' color={Theme.palette.text.primary} fontWeight={700} letterSpacing={15}>WHAT IS HORIZONS</Material.Typography>
                                    <Material.Divider variant='fullWidth' color={Theme.palette.text.primary} />
                                </div>

                            </div>

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




function getWindowSize() {
    if (typeof window === 'undefined') return
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
}