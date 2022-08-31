import type { NextPage } from 'next'

import Footer from '@components/footers'

import * as Material from '@mui/material'

import Theme from '@assets/themes/dark'



const spaceEngineers: NextPage = () => {

    return (
        <div className='bg-slate-900 h-screen'>
            <Material.ThemeProvider theme={Theme}>

                <Material.Typography
                    variant='h1'
                    color={Theme.palette.text.primary}
                    fontWeight={700}
                    letterSpacing={15}
                    className='text-center underline underline-offset-4'
                >SPACE ENGINEERS</Material.Typography>
            </Material.ThemeProvider>
        </div>
    )

}

export default spaceEngineers