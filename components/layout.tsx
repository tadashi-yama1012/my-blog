import styles from '../styles/layout.module.css'
import Link from 'next/link'
import Title from './title'
import { siteTitle } from '../lib/constants';
import SubMenu from './submenu';

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
                        <a>← トップページへ戻る</a>
                    </Link>
                </div>
            )}
            <SubMenu />
            <footer className={styles.footer}>
                <div>&copy;Tadashi Yamazaki</div>
            </footer>
        </div>
    )
}
  
export default Layout