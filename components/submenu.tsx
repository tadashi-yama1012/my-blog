import styles from '../styles/layout.module.css'
import Link from 'next/link'

export default function SubMenu() {
    return (
        <div className={styles.subMenu}>
            <div><Link href="/archive">過去記事</Link></div>
            <div><Link href="/posts/policy">サイトポリシー</Link></div>
        </div>
    );
}