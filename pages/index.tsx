import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import { Landing as Layout } from '@components/layouts/landing'

import Footer from '@components/footers'

import * as Images from '@assets/images'


const Home: NextPage = () => {

    return (
        <Layout title='Horizons' Footer={Footer}>

            <header>
                <Image src={Images.Logo} />
            </header>

        </Layout>
    )

}

export default Home