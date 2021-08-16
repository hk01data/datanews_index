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


function main() {
  util.doLogin(loadJSON)
}

main()
