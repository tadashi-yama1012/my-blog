import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { profileIconAlt } from '../lib/constants'

export default function ProfileIcon() {
    return <img
        src="/images/profile.png"
        width={256} height={256}
        className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
        alt={profileIconAlt}
    />
}