import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import * as Material from '@mui/material'
import Theme from '@assets/themes/dark'


import { Landing as Layout } from '@components/layouts/landing'

import Footer from '@components/footers'

import * as Images from '@assets/images'


const Home: NextPage = () => {

    return (
        <Material.ThemeProvider theme={Theme}>

            <Layout title='Horizons' Footer={Footer}>

                <header style={{ height: '200px' }}>
                    <Image src={Images.Logo} />
                </header>



            </Layout>

        </Material.ThemeProvider>
    )

}

export default Home