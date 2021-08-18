import React, {useRef, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import ADate from '../../components/date'
import Layout from '../../components/layout'
import Sidebar from '../../components/Sidebar'
import Flourish from '../../components/Flourish'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'
import 'handsontable/dist/handsontable.full.css';

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      postData,
      allPostsData
    }
  }
}

function Adiv ({children}) {
  return (<div>
    {children}
  </div>)
}

export default function Post({ postData, allPostsData, navbarOpen }) {
  const router = useRouter()
  const { id } = router.query

  /**
   * Missing "window" work-around
   * https://github.com/handsontable/handsontable/issues/7445
   */
  const HotApp = dynamic(
    () => import('../../components/Htable'),
    { ssr: false }
  );

  return <Layout>
    <Head>
      <title>{postData.ctitle}</title>
    </Head>

    <Sidebar allPostsData={allPostsData} postId={id} navbarOpen={navbarOpen}>
    </Sidebar>

    <Adiv>
      <h1 className={utilStyles.headingXl}>{postData.ctitle}</h1>
      <br />
      ({postData.id})
      <br />

      <div className={utilStyles.lightText}>
        <ADate dateString={postData.publish_time} />
      </div>

      <Flourish doc_id={postData.doc_id} />

      <HotApp data={postData.data} />

      <hr />

      {
        postData.settings
      }
    </Adiv>
  </Layout>
}
