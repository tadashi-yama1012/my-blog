import Document, {Html, Head, Main, NextScript } from 'next/document'
import { existsGaId, GA_ID, scriptTag } from '../lib/gtag'
import { name, siteTitle, siteUrl } from '../lib/constants';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content={`${name}'のウェブサイトです。無目的雑記帳。`}
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.now.sh/${encodeURI(
                            siteTitle
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                    {existsGaId ? (
                            <>
                                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                                <script dangerouslySetInnerHTML={{ __html: scriptTag }} />
                            </>
                    ) : null}
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" rel="stylesheet" />
                    <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/rss.xml`} title={`${siteTitle}`} />
                    <link rel="alternate" type="application/atom+xml" href={`${siteUrl}/atom.xml`} title={`${siteTitle}`} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}