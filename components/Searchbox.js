import React, {useRef, useState, useEffect} from 'react'
import Link from 'next/link'
import Icon from './Icon'
import { faHome } from "@fortawesome/free-solid-svg-icons"; // import the icons you need

export default function Searchbox({ doc_id }) {
  return (
    <div className="flex">
      <Link className="w-1/5" href="/" title="首頁">
        <Icon icon={faHome} />
      </Link>
      {/* <input id="search-box" className="w-3/5" type="text" defaultValue="search here" />
      <button id="do-search" className="w-1/5">Go</button> */}
    </div>
  )
}
