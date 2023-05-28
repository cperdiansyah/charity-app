/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  // Configure the build process.
  typescript: {
    // Enable TypeScript support.
    enable: true,
  },

  // Configure the routing system.
  // routes: [
  // 	{
  // 		path: "/",
  // 		component: MyHomePage,
  // 	},
  // 	{
  // 		path: "/about",
  // 		component: MyAboutPage,
  // 	},
  // ],

  // Configure the SEO settings.
  seo: {
    title: 'Charity App',
    description: 'This is my website.',
  },

  // Configure the analytics settings.
  // analytics: {
  // 	// Enable Google Analytics.
  // 	googleAnalytics: {
  // 		trackingId: "UA-XXXXXXXX-X",
  // 	},
  // },

  // Configure the image optimization settings.
  images: {
    // Enable image optimization.
    enable: true,
  },

  // Configure the font optimization settings.
  fonts: {
    // Enable font optimization.
    enable: true,
  },
  // Saass
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
