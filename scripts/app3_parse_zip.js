const util = require('./util')
const fs = require('fs')
const request = require('request')
const unzipper = require('unzipper')
const Batch = require('batch')


function readJSON() {
  let res = fs.readFileSync(`public/list_ts.json`)
  return JSON.parse(res)
}


function buildJSON(filename, ext_text, ts, prjtype, prjname) {
  let g_obj = {
      'doc_id': filename,
      'ts': ts,
      'prjtype': prjtype,
      'prjname': prjname,
  }
  ext_text.split('\n\t').map(row => {
    if (-1 != row.indexOf('window.template.data')) {
      return
    }
    let arr = row.split(' = ')
    let name = null
    let ajson = null
    try {
      if (arr.length > 1) {
        name = arr[0].split('_Flourish_')[1]
        let enpos = arr[1].lastIndexOf('}')
        ajson = JSON.parse(arr[1].toString().slice(0, enpos+1))
      }

      if (name !== null && ajson !== null) {
        g_obj[name] = ajson
      }
    } catch (e) {
      console.error(arr)
      throw e
    }
  })
  return g_obj
}

function main() {
  // Read html
  ids = readJSON()['projects_and_tags']
  let result = []
  ids.forEach(function (item) {
    let filename = item['id']

    let atext = fs.readFileSync(`public/zip/unzip/${filename}/index.html`)

    const stpos = atext.indexOf('var _Flourish_settings')
    const enpos = atext.indexOf('window.template.draw();')
    const ext_text = atext.slice(stpos, enpos).toString()

    result.push(buildJSON(`${filename}`, ext_text, Date.now(), item['project_type'], item['name']))
  })

  fs.writeFileSync(`public/new_data_source.json`, JSON.stringify(result))
}

main()
