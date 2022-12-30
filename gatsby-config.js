require('dotenv').config()
let apiKey
try{
   apiKey = require('./api-key');
} catch (e) {
  console.warn(e)
  apiKey = {}
  apiKey.key = null
}

console.log({apiKey})

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: '/src/graphics'
        }
      }
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: apiKey.key || process.env.DATO_API_TOKEN,
      },
    },
  ],
}
