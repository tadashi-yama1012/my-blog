import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { profileIconAlt } from '../lib/constants'

export default function ProfileIcon() {
    return <img
        src="/images/profile.png"
        className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
        alt={profileIconAlt}
    />
}