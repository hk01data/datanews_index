require('dotenv').config()
const util = require('./util')
const fs = require('fs')
const https = require('https')
const chrono = require('chrono-node')

const USER_AGENT = process.env.USER_AGENT
const fl_app_path = process.env.FL_APP_PATH

function loadJSON(cookieString) {
  const options = {
    hostname: 'app.flourish.studio',
    port: 443,
    path: fl_app_path,
    method: 'GET',
    followAllRedirects: true,
    headers: {
      'Host': 'app.flourish.studio',
      'User-Agent': USER_AGENT,
      'Accept': 'application/json,* /*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Referer': 'https://app.flourish.studio/projects',
      'Cookie': cookieString,
      'Upgrade-Insecure-Requests': '1'
    }
  }

  let datastr = '';

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      datastr += d
    })

    res.on('end', d => {
      // Write json to file system
      fs.writeFile(`public/list.json`, datastr, {
        encoding: 'utf-8',
        flag: 'w'
      }, function(err) {
        if (err) {
          console.error(err)
          return
        }
      })
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
}


function convertDate () {
  let res = fs.readFileSync(`public/list.json`, {encoding: 'utf-8'})
  let ajson = JSON.parse(res)
  let dateNowObj = new Date()
  let newTs = []

  if (ajson['projects_and_tags']) {
    newTs = ajson['projects_and_tags'].map(o => {
      return {
        ...o,
        timestamp_str: chrono.parseDate(o['timestamp_str'], dateNowObj)
      }
    })
  }

  let bjson = JSON.parse(res)
  bjson['projects_and_tags'] = newTs

  fs.writeFileSync(`public/list_ts.json`, JSON.stringify(bjson), {encoding: 'utf-8'})
}


function main() {
  util.doLogin(loadJSON)
  convertDate()
}

main()
