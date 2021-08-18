// import styles from './layout.module.css'

// export default function Layout({ children }) {
//   return <div className={styles.container}>{children}</div>
// }
import React, {useRef, useState, useEffect} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Icon from './Icon'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { faBars } from "@fortawesome/free-solid-svg-icons"; // import the icons you need


const name = '用數據講故事'
export const siteTitle = 'Next.js Sample Website'
const BASEPATH = process.env.NODE_ENV === 'production' ? '/datanews_index/' : ''

export default function Layout({ children, home }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div>
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
          <button className="text-right" onClick={() => setNavbarOpen(!navbarOpen)}>
            <Icon icon={faBars}/>
          </button>

          {home ? (
            <>
              <Image
                priority
                src={`${BASEPATH}/images/profile.jpg`}
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

        <div className={styles.container}>
          {
            React.Children.map(children, child => React.cloneElement(child, { navbarOpen: navbarOpen }))
          }
        </div>

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
