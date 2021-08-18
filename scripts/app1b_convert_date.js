require('dotenv').config()
const util = require('./util')
const fs = require('fs')
const https = require('https')
const chrono = require('chrono-node')

function convertDate () {
  let res = fs.readFileSync(`public/list.json`, {encoding: 'utf-8'})
  let ajson = JSON.parse(res)
  let dateNowObj = new Date()
  let newTs = []

  if (ajson['projects_and_tags']) {
    newTs = ajson['projects_and_tags'].map(o => {
      if ('story' == o['project_type']) {
        return null
      }
      return {
        ...o,
        timestamp_str: chrono.parseDate(o['timestamp_str'], dateNowObj)
      }
    })
    .filter(o => o !== null)
  }

  let bjson = JSON.parse(res)
  bjson['projects_and_tags'] = newTs

  fs.writeFileSync(`public/list_ts.json`, JSON.stringify(bjson), {encoding: 'utf-8'})
}


function main() {
  convertDate()
}

main()
