import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'


const HelmetWrapper = ({ children }) => (
	<StaticQuery query={graphql`query LayoutQuery {
  datoCmsSite {
    globalSeo {
      siteName
    }
    faviconMetaTags {
      ...GatsbyDatoCmsFaviconMetaTags
    }
  }
  datoCmsHome {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    introText
    copyright
  }
  allDatoCmsSocialProfile(sort: {position: ASC}) {
    edges {
      node {
        profileType
        url
      }
    }
  }
}`}
	render={data => (
		<>
			<HelmetDatoCms
				favicon={data.datoCmsSite.faviconMetaTags}
				seo={data.datoCmsHome.seoMetaTags}
			/>
			{children}
		</>
	)}
	/>
)

HelmetWrapper.propTypes = {
	children: PropTypes.object,
}

export default HelmetWrapper
