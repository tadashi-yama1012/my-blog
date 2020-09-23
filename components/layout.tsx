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
            <footer className={styles.footer}>
                <div>&copy;Tadashi Yamazaki</div>
                <div className={styles.footMenu}><Link href="/posts/policy">policy</Link></div>
            </footer>
        </div>
    )
}
  
export default Layout