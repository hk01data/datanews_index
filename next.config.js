const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      basePath: '/',
    }
  }

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    basePath: '/datanews_index',
    images: {
      loader: 'akamai'
    }
  }
  return nextConfig
}
