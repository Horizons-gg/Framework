//? Next

import { Montserrat } from '@next/font/google'



//? React Spring

import { useSpring, animated } from '@react-spring/web'



//? Images

import Logo from '@/public/images/logo.png'



//? Fonts

const Montserrat_Title = Montserrat({ weight: '700', subsets: ['latin'] })



export default function AnimatedLogo (props: { screenHeight?: boolean }) {


    //? Animations

    const translateLogo = useSpring({
        from: {
            opacity: 0,
            marginTop: 1000
        },

        to: {
            opacity: 1,
            marginTop: 0
        },

        delay: 500,

        config: {
            tension: 250,
            friction: 100
        }
    })

    const translateTitleDesktop = useSpring({
        from: {
            maxWidth: 0
        },

        to: {
            maxWidth: 800
        },

        delay: 2000,

        config: {
            tension: 200,
            friction: 100
        }
    })
    const translateTitleMobile = useSpring({
        from: {
            maxWidth: 0
        },

        to: {
            maxWidth: 280
        },

        delay: 2200,

        config: {
            tension: 200,
            friction: 100
        }
    })



    return (
        <>
            <div className={`${props.screenHeight ? 'h-screen' : null} hidden lg:flex justify-center items-center gap-5 select-none`}>
                <animated.div style={translateLogo}>
                    <div
                        className='w-[140px] h-[140px]'
                        style={{
                            backgroundImage: `url(${Logo.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                </animated.div>

                <animated.div style={translateTitleDesktop}>
                    <div>
                        <h1 className={`${Montserrat_Title.className} text-9xl overflow-hidden`} style={{ letterSpacing: '10px' }}>HORIZONS</h1>
                    </div>
                </animated.div>
            </div>


            <div className={`${props.screenHeight ? 'h-screen' : null} flex lg:hidden justify-center items-center gap-3 select-none`}>
                <animated.div style={translateLogo}>
                    <div
                        className='w-[35px] h-[35px]'
                        style={{
                            backgroundImage: `url(${Logo.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                </animated.div>

                <animated.div style={translateTitleMobile}>
                    <div>
                        <h1 className={`${Montserrat_Title.className} text-4xl overflow-hidden`} style={{ letterSpacing: '10px' }}>HORIZONS</h1>
                    </div>
                </animated.div>
            </div>
        </>
    )
}