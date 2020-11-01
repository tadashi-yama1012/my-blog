import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPostDates, getAllPostIds, getPostData, getPostDataByDate } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { siteTitle } from '../../lib/constants'

export default function Post({ postDatas, date }) {
    return (
        <Layout home={false}>
            <Head>
                <title>{`Archive:${date} - ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Archive:{date}</h2>
                <ul className={utilStyles.list}>
                    {postDatas.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            {' '}
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
            <br/>
            <Link href={'/archive'}>
                <a>← back to archive index</a>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostDates().map(elm => {
        return {
            params: {
                date: elm
            }
        };
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postDatas = getPostDataByDate(params.date);
    return {
        props: {
            date: params.date,
            postDatas
        }
    }
}