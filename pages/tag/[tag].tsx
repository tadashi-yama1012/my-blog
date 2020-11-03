import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPostTags, getPostDataByTag } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { siteTitle } from '../../lib/constants'

export default function Post({ postDatas, tag }) {
    return (
        <Layout home={false}>
            <Head>
                <title>{`タグ:${tag} - ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>タグ:{tag}</h2>
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
            <Link href={'/tag'}>
                <a>← タグインデックスに戻る</a>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostTags().map(elm => {
        return {
            params: {
                tag: elm
            }
        };
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postDatas = getPostDataByTag(params.tag);
    return {
        props: {
            tag: params.tag,
            postDatas
        }
    }
}