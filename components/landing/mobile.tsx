//? Next

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Montserrat } from '@next/font/google'



//? User Interface

import * as Material from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'



//? Component

export default function TextPanel() {

    return (
        <div className='block lg:hidden'>
            <Material.Typography variant='h5' color={'white'} fontWeight={700} letterSpacing={15} style={{ textIndent: 15 }}>JOIN THE COMMUNITY</Material.Typography>

            <Material.Divider variant='middle' color={'white'} style={{ marginTop: 15, marginBottom: 15 }} />

            <Material.Typography variant='body1'>We host Servers in Australia, North America, and Europe.<br /><br />We have a strong, friendly community that loves to play games and hangout with one another.<br /><br />We develop and host games and other online entertainment services and use Discord as our primary platform.</Material.Typography>

            <br />

            <p className='animate-pulse'>
                <Link href="https://discord.gg/horizons" target="_blank">
                    <Material.Link underline='none'>
                        <span className="sr-only">Discord</span>
                        <Material.Typography variant='caption' fontWeight={600} fontSize={17} color={'#fff'}>JOIN DISCORD</Material.Typography> <FontAwesomeIcon size="lg" color={'#fff'} icon={BrandIcons.faDiscord} />
                    </Material.Link>
                </Link>
            </p>

            <Material.Divider variant='middle' color={'white'} style={{ marginTop: 15, marginBottom: 15 }} />

        </div>
    )
}