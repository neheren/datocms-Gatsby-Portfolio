import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Front from '../components/Front/index.js'
import theme from '../styles/theme'
import OuterCases from '../components/Cases/OuterCases'
import Menu from '../components/Menu'
import About from '../components/About/About'
import {HelmetDatoCms} from 'gatsby-source-datocms'
import {Tiles} from '../components/Tiles'

import '../styles/index.sass'
import Footer from '../components/Footer/Footer'
import HelmetWrapper from '../components/layout'


const IndexPage = ({data}) => {

	console.log('SEO', data.home)
	return	<ThemeProvider theme={theme}>
		<HelmetWrapper>
			<h1 style={{display: 'none'}}>Portfolio by Nikolaj Schlüter Nielsen</h1>
			<Menu/>
			<HelmetDatoCms seo={data.home.seoMetaTags} />
			<Front videoLink={'https://kirstineogsigurd.dk/portfoliovideo.mp4'} isProject={false}/>
			<OuterCases />
			<About data={data.about}/>
			<Tiles/>
			<Footer/>
		</HelmetWrapper>
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
      fluid(maxWidth: 600, imgixParams: {fm: "jpg", auto:
"compress"}) {
        ...GatsbyDatoCmsSizes
      }
    }
  }
  allDatoCmsWork(sort: {position: ASC}) {
    edges {
      node {
        id
        title
        slug
        excerpt
        coverImage {
          fluid(maxWidth: 450, imgixParams: {fm: "jpg", auto:
"compress"}) {
            ...GatsbyDatoCmsSizes
          }
        }
      }
    }
  }
}

`
