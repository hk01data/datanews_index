require('dotenv').config()
const fs = require('fs')
const querystring = require('querystring')
const request = require('request')

const baseurl = process.env.SS_URL
const USER_AGENT = process.env.USER_AGENT
const TYPE_UNZIP = process.env.TYPE_UNZIP
const TABLE_UNZIP = process.env.TABLE_UNZIP


function syncSheetUnzip () {
  // Read json
  let res = fs.readFileSync(`public/new_data_source.json`)
  let listJson = JSON.parse(res)
  const schema = [ "doc_id", "ts", "prjtype", "prjname", "settings", "data_column_names", "data_metadata", "data"]
  let newJson = listJson.map((o, idx) => schema.map(x => {
    if (-1 !== ['doc_id', 'prjtype', 'prjname'].indexOf(x)) {
      return o[x]
    } else {
      return o[x] ? JSON.stringify(o[x]) : "-"
    }
  }))

  const dataRaw = {
    type: TYPE_UNZIP,
    table: TABLE_UNZIP,
    json: newJson
  }
  const data = JSON.stringify(dataRaw)

  const options = {
    url: baseurl,
    method: 'POST',
    followAllRedirects: true,
    timeout: 900000,
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Content-Type': 'application/json',
    },
    body: data
  }

  request(options, function(err, resp, body) {
    if(err) throw err;
    console.log("req done!", body, resp)
  })
}


function main() {
  syncSheetUnzip()
}

main()
