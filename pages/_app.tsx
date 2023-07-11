//? Style Sheets

import '@/styles/globals.css'

import '@/styles/scroll.css'
import '@/styles/animations.css'



//? App

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
