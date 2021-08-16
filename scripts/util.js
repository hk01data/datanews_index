require('dotenv').config()
const https = require('https')
const querystring = require('querystring')

const USER_AGENT = process.env.USER_AGENT

function doLogin(callback) {
  const data = querystring.stringify({
    email: process.env.FL_USERNAME,
    password: process.env.FL_PASSWORD,
  })

  const options = {
    hostname: 'app.flourish.studio',
    port: 443,
    path: '/login',
    method: 'POST',
    followAllRedirects: true,
    headers: {
      'Host': 'app.flourish.studio',
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      'Origin': 'https://app.flourish.studio',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    if (res.statusCode == 302) {
      let cookieString = res.headers['set-cookie']
        .map((o) => {
          return o.split('; ')[0]
        })
        .join('; ')

      callback(cookieString)
    }

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

module.exports = {
  doLogin: doLogin
}
