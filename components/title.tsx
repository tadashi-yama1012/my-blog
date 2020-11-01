import Link from 'next/link'
import { message } from '../lib/constants'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import ProfileIcon from './profileicon'

export default function Title({ titleString, home }) {
    return home ? (
        <>
            <ProfileIcon />            
            <h1 className={utilStyles.heading2Xl}>{titleString}</h1>
            <p className={styles.message}>{message}</p>
        </>
        ) : (
        <>
            <Link href="/">
                <a>
                    <ProfileIcon />
                </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
                <Link href="/">
                    <a className={utilStyles.colorInherit}>{titleString}</a>
                </Link>
            </h2>
        </>
    )
}