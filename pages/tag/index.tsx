import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostTags } from '../../lib/posts'
import { siteTitle } from '../../lib/constants'

export default function Archive({ allPostsTags }: { allPostsTags: string[] }) {
    return (
        <Layout home={false}>
            <Head>
                <title>タグインデックス - {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>タグインデックス</h2>
                <ul className={utilStyles.horizontalList}>
                {allPostsTags.map((elm, idx) => (
                    <li key={idx} className={utilStyles.hListItem}>
                        <Link href={`/tag/${elm}`}>
                            <a>{elm}</a>
                        </Link>
                    </li>
                ))}
                </ul>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsTags = getAllPostTags();
    return {
        props: {
            allPostsTags
        }
    }
}