import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Front from '../components/Front/index.js'
import theme from '../styles/theme'
import Cases from '../components/Cases'
import Menu from '../components/Menu'
import About from '../components/About/About'
import {HelmetDatoCms} from 'gatsby-source-datocms'



const IndexPage = ({data}) => {
	return	<ThemeProvider theme={theme}>
		<Menu/>
		<HelmetDatoCms seo={data.seoMetaTags} />
		<Front videoLink={'http://kirstineogsigurd.dk/portfoliovideo.mp4'} isProject={false}/>
		<Cases />
		<About data={data.about}/>
	</ThemeProvider>
}

IndexPage.propTypes = {
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
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
