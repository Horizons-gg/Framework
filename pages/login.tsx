import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

import $ from 'jquery'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'

import Theme from '@assets/themes/dark'
import * as Material from '@mui/material'

import { Simple as Layout } from '@components/layouts/panels'
import * as UI from '@components/ui'



const Login: NextPage = () => {

    async function SubmitLogin() {
        const username = $('#username').val()?.toString().trim()
        const password = $('#password').val()?.toString().trim()

        if (!username || !password) return alert('Please fill in all fields')

        const Data: any = await fetch(`/api/auth/login?username=${username}&password=${password}`)
            .then(res => res.json())
            .catch(err => console.log(err))

        if (!Data.token) return console.log('Request did not respond with a token')

        localStorage.setItem('Token', Data.token)
    }


    return (
        <Material.ThemeProvider theme={Theme}>

            <Layout title="Login to Horizons" subtitle="You can manage phone, email and chat conversations all from a single mailbox.">
                <Material.TextField id='username' variant='filled' placeholder='Email or Username' />
                <Material.TextField id='password' variant='filled' type='password' placeholder='Password' />

                <div className='mt-5 flex justify-around'>
                    <Material.Button variant='outlined' onClick={SubmitLogin} className="px-10">
                        <span className="text-sm font-medium">
                            Login
                        </span>
                        <FontAwesomeIcon icon={SolidIcons.faUser} className="w-5 h-5 ml-3" />
                    </Material.Button>

                    <Link href="/register">
                        <a>
                            <Material.Button variant='outlined' className="px-10">
                                <span className="text-sm font-medium">
                                    Register
                                </span>
                                <FontAwesomeIcon icon={SolidIcons.faArrowRightLong} className="w-5 h-5 ml-3" />
                            </Material.Button>
                        </a>
                    </Link>

                </div>
            </Layout>

        </Material.ThemeProvider>
    )
}

export default Login