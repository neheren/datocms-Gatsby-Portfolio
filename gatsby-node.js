const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      console.log({result})
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `cases/${work.slug}`,
          component: path.resolve(`./src/templates/work.tsx`),
          context: {
            slug: work.slug,
          },
        })
      })
      resolve()
    })
  })
}
