import React, {useRef, useState, useEffect} from 'react'

export default function Flourish({ doc_id }) {
  const embedRef = useRef()

  useEffect(function () {
    setTimeout(() => {
      embedRef.current.innerHTML = ''
      window.FlourishLoaded = false

      let scriptEl = document.getElementById('flourishEmbedCode')
      if (scriptEl) {
        document.body.removeChild(scriptEl)
      }
      const script = document.createElement('script')
      script.src = 'https://public.flourish.studio/resources/embed.js'
      script.id = 'flourishEmbedCode'
      document.body.appendChild(script)
    }, 250); // Update the content of the element after 0.25seconds
  }, [doc_id]) // Hook when the post id changes

  return (<div
    className="flourish-embed flourish-chart"
    data-src={`visualisation/${doc_id}`}
    data-url={`https://flo.uri.sh/visualisation/${doc_id}/embed`}
    aria-label=""
    ref={embedRef}
  >
  </div>)
}
