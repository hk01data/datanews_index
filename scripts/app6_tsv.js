require('dotenv').config()
const fs = require('fs')
const querystring = require('querystring')
const request = require('request')
const Papa = require('papaparse')
const chrono = require('chrono-node')

const USER_AGENT = process.env.USER_AGENT
const csvurl = process.env.CSV_URL


function getCSVData () {
  const options = {
    url: csvurl,
    method: 'GET',
    followAllRedirects: true,
    timeout: 90000,
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Content-Type': 'application/json',
    }
  }

  request(options, function(err, resp, body) {
    if(err) throw err;
    // console.log("req done!", body, resp)

    // Parse csv
    const content = body
    let results = Papa.parse(content, {
      header: true,
      delimiter: "\t",
      complete: function(a) {
        console.log("Finished:", a)
      }
    })

    // Write to json
    let list = fs.readFileSync(`public/list_ts.json`)
    JSON.parse(list)["projects_and_tags"].map((item, i) => {
      let filered = results.data.filter(o => o.doc_id === '' + item.id)
      let dateNowObj = new Date()

      if (filered.length) {
        let newFiltered = {
          ...filered[0],
          publish_time: chrono.parseDate(filered[0]['publish_time'], dateNowObj)
        }
        fs.writeFileSync(`public/output/${item.id}.json`, JSON.stringify(newFiltered),{encoding: 'utf-8', flag: 'w'})
      }
    })
  })
}


function main() {
  getCSVData()
}

main()
