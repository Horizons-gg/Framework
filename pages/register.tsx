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



const Register: NextPage = () => {

    async function RegisterAccount() {
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
            <Layout title="Account Registration" subtitle="You can manage phone, email and chat conversations all from a single mailbox.">

                <Material.TextField id='email' variant='filled' placeholder='Email' />
                <Material.TextField id='username' variant='filled' placeholder='Username' />
                <Material.TextField id='password' variant='filled' type='password' placeholder='Password' />

                <div className='mt-5 flex justify-around'>

                    <Link href="/login">
                        <a>
                            <Material.Button variant='outlined' className="px-5">
                                <FontAwesomeIcon icon={SolidIcons.faArrowLeftLong} className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">
                                    Back to Login
                                </span>
                            </Material.Button>
                        </a>
                    </Link>

                    <Material.Button variant='outlined' onClick={RegisterAccount} className="px-5">
                        <span className="text-sm font-medium">
                            Register Account
                        </span>
                        <FontAwesomeIcon icon={SolidIcons.faUser} className="w-5 h-5 ml-3" />
                    </Material.Button>
                </div>

            </Layout>
        </Material.ThemeProvider>
    )
}

export default Register