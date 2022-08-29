import type { GetServerSideProps, NextPage } from 'next'

import { Landing as Layout } from '@components/layouts/landing'

import Footer from '@components/footers'


const Home: NextPage = () => {

    return (
        <Layout title='Horizons' Footer={Footer}>
            <p>stuff</p>
        </Layout>
    )

}

export default Home