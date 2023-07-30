/** @type {import('next').NextConfig} */

// const path = require('path')
const nextConfig = {
  // optimizeFonts: false,

  // experimental: {
  //   serverActions: true,
  // },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  env: { NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
}

module.exports = nextConfig
