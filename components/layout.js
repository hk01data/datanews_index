// import styles from './layout.module.css'

// export default function Layout({ children }) {
//   return <div className={styles.container}>{children}</div>
// }

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'


const name = '用數據講故事'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={utilStyles.wrapper}>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
                unoptimized={true}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : null}
        </header>

        {children}

        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← 返回</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
