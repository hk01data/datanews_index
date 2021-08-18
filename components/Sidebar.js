import Link from 'next/link'
import ADate from '../components/date'
import Searchbox from '../components/Searchbox'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Sidebar({ allPostsData, postId, navbarOpen }) {
  const navclass = (navbarOpen ? " flex" : " hidden")

  return (
    <aside className={styles.sidebar + navclass}>
      <Searchbox />

      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, publish_time, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a className={id.toString() === (postId ? postId : '').toString() ? utilStyles.active: null}>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <ADate dateString={publish_time} />
            </small>
          </li>
        ))}
      </ul>
    </aside>
  )
}
