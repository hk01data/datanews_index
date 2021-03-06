require('dotenv').config()
const fs = require('fs')
const querystring = require('querystring')
const request = require('request')

const baseurl = process.env.SS_URL
const USER_AGENT = process.env.USER_AGENT
const TYPE_LIST = process.env.TYPE_LIST
const TABLE_LIST = process.env.TABLE_LIST

function readJSON () {
  let res = fs.readFileSync(`public/list_ts.json`)
  return JSON.parse(res)
}


function syncSheetList () {
  // Read json
  let listJson = readJSON()
  const schema = [ "id", "name", "project_type", "is_folder", "version_number", "timestamp_str", "is_published", "thumbnail", "showcase_url" ]
  let newJson = listJson["projects_and_tags"].map((o, idx) => schema.map(x => o[x] ? o[x].toString() : "-"))

  const dataRaw = {
    type: TYPE_LIST,
    table: TABLE_LIST,
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
  syncSheetList()
}

main()
