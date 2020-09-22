import { useEffect } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app'
import Router from 'next/router'
import '../styles/globals.css'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (!gtag.existsGaId) {
            return
        }
        const handleRouteChange = (path) => {
            gtag.pageview(path)
        }
        Router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])
    return <Component {...pageProps} />
}

export default MyApp
