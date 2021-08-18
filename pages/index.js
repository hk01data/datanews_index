import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import Sidebar from '../components/Sidebar'

import utilStyles from '../styles/utils.module.css'
import 'handsontable/dist/handsontable.full.css'

import { getSortedPostsData } from '../lib/posts'

/**
 * Missing "window" work-around
 * https://github.com/handsontable/handsontable/issues/7445
 */
const HotApp = dynamic(
  () => import('./../components/Htable'),
  { ssr: false }
)


export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

function Adiv ({children}) {
  return (<div>
    {children}
  </div>)
}

export default function Home({ allPostsData, navbarOpen }) {
  return (
    <Layout home>
      <Head>
        <title>Datanews 作品集</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar allPostsData={allPostsData} navbarOpen={navbarOpen}>
      </Sidebar>

      <Adiv>
        <main>
          <h1 className="title">
            <Link href="https://www.hk01.com/channel/460">
              <a>研數所 Channel</a>
            </Link>
          </h1>

          <p className="description">
            Data can tell the story.
          </p>

          <div className="grid">
            <a href="https://nextjs.org/docs" className="card">
              <h3>研數所 &rarr;</h3>
              <p>熱門關注議題互動圖表</p>
            </a>

            <a href="https://nextjs.org/learn" className="card">
              <h3>香港01 &rarr;</h3>
              <p>網絡新聞資訊一站式服務平台</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className="card"
            >
              <h3>Data.gov.hk &rarr;</h3>
              <p>政府資料一線通</p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="card"
            >
              <h3>GitHub &rarr;</h3>
              <p>數據新聞程式碼</p>
            </a>
          </div>
        </main>

        <footer>
          <a href="https://www.hk01.com/">
            香港01有限公司版權所有 &copy;
            {
              ` ${(new Date).getFullYear()}`
            }
          </a>
        </footer>
      </Adiv>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}
