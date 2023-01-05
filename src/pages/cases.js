import React from 'react'
import Menu from '../components/Menu'
import theme from '../styles/theme'
import {ThemeProvider} from 'styled-components'
import AllCases from '../components/Cases/AllCases/AllCases'

function CasesPage({data}) {

    console.log(data)
    return	<ThemeProvider theme={theme}>
        <Menu/>
        {/*<HelmetDatoCms seo={data.seoMetaTags} />*/}
        <AllCases data={data} />
    </ThemeProvider>
}

export default CasesPage

export const query = graphql`
  query CasesQuery {
    home: datoCmsHome {
      modelVideo {
        url
      }
      seoSettings {
        description
        title
        twitterCard
      }
	  seoMetaTags {
	    tags
       }
    }

    about: datoCmsAboutPage {
      title
      subtitle
      bio
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      
    }
  
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`


CasesPage.propTypes = {

}

