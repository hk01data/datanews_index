const util = require('./util')
const fs = require('fs')
const request = require('request')
const unzipper = require('unzipper')
const Batch = require('batch')


function readJSON() {
  let res = fs.readFileSync(`public/list_ts.json`)
  return JSON.parse(res)
}


function main() {
  // Extract zips
  let ids = readJSON()['projects_and_tags']
  ids.forEach(function (item) {
    let filename = item['id'];

    fs.createReadStream(`public/zip/${filename}.zip`)
      .on('error', err => {
        console.log(err)
      })
      .pipe(unzipper.Extract({ path: `public/zip/unzip/${filename}` }))
  })
}

main()
