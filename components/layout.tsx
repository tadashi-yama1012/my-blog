import styles from '../styles/layout.module.css'
import Link from 'next/link'
import Title from './title'
import { siteTitle } from '../lib/constants';

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Title home={home} titleString={siteTitle} />
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
            <div className={styles.subMenu}>
                <div><Link href="/archive">Archive</Link></div>
                <div><Link href="/posts/policy">Site policy</Link></div>
            </div>
            <footer className={styles.footer}>
                <div>&copy;Tadashi Yamazaki</div>
            </footer>
        </div>
    )
}
  
export default Layout