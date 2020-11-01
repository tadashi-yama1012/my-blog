import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostDates } from '../../lib/posts'
import { siteTitle } from '../../lib/constants'

export default function Archive({ allPostsDate }: { allPostsDate: string[] }) {
    return (
        <Layout home={false}>
            <Head>
                <title>過去記事インデックス - {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>過去記事インデックス</h2>
                {allPostsDate.map((elm, idx) => (
                    <li key={idx}>
                        <Link href={`/archive/${elm}`}>
                            <a>{elm}</a>
                        </Link>
                    </li>
                ))}
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsDate = getAllPostDates();
    return {
        props: {
            allPostsDate
        }
    }
}