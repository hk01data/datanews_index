const util = require('./util')
const fs = require('fs')
const request = require('request')
const unzipper = require('unzipper')
const Batch = require('batch')
const batch = new Batch

function downloadBinary(path, filename, cookieString, done) {
  const options = {
    url: `https://app.flourish.studio${path}`,
    encoding: null,
    timeout: 60000,
    headers: {
      'Cookie': cookieString,
      'Referer': `https://app.flourish.studio/visualisation/${filename}/edit`,
    }
  }

  let output = `public/zip/${filename}.zip`

  request(options, function(err, resp, body) {
    if(err) throw err;
    fs.writeFile(output, body, 'binary', function(err) {
      console.log("file written!");
      done()
    });
  });
}

function readJSON() {
  let res = fs.readFileSync(`public/list_ts.json`)
  return JSON.parse(res)
}

function makeConcurrent(cookieString) {
  batch.concurrency(80)

  let ids = readJSON()['projects_and_tags']

  ids.forEach(function (item) {
    batch.push(function (done) {
      let path = `/${item['project_type']}/${item['id']}/download?`
      if ('story' === item['project_type']) {
        // Skip download story type
        // downloadBinary(path, item['id'], cookieString, done)
        (function(){}())
      } else {
        downloadBinary(path, item['id'], cookieString, done)
      }
    })
  })

  batch.on('progress', function (e) {
    console.log(`> progress: ${JSON.stringify(e)}`)
  })

  batch.end(function (err, item) {
    console.log(`> done download: ${JSON.stringify(item)}`)
  })
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
  // Download Zip
  util.doLogin(makeConcurrent)
}

main()
