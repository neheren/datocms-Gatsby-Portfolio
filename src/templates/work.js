import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Front from '../components/Front';
import styled, { ThemeProvider, css } from 'styled-components'
import theme from '../styles/theme'
import Container from '../components/Shared/Container'
import rectArrow from '../graphics/rect-arrow.svg'
import TagName from './Work/Tag'
import Menu from '../components/Menu';



const Doc = styled.div`
  background-color: #EFEFEF;
`

const ModifiedSlider = styled(Slider)`

`

const Header = styled.h1`
  margin: ${props => props.theme.spacing(4, 0, 0, 0)};
  font-size: 80px;
  font-weight: bolder;
  color: black;
  text-transform: lowercase;
`

const Desc = styled.p`
  margin: ${props => props.theme.spacing(2, 0)};
`

const Image = styled.img`
  height: 400px;
  width: auto !important;
  max-width: 100%;
`

const ImageWrapper = styled.div`
  padding-right: ${props => props.theme.spacing(2)};

`

const Arrow = styled.img`
  height: 40px !important;
  width: 28px !important;
  margin: ${props => props.theme.spacing(0, -4)};
  transition: 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  &:hover{

    width: 32px !important;
  }
    /* transform: scale() !important; */
  ${props => props.reverse && css`
    transform: rotate(180deg) !important;
  `}
`

const SliderWrapped = styled(Slider)`
  margin: ${props => props.theme.spacing(2, 0)};
  div{
    height: 400px;
  }
`


export default ({ data }) => (
	<ThemeProvider theme={theme}>
		<Front isProject videoLink={data.datoCmsWork.video ? data.datoCmsWork.video.url : ''} caseName={data.datoCmsWork.title} />
		<HelmetDatoCms seo={data.datoCmsWork.seoMetaTagsseoMetaTags} />
		<Doc>
        <Menu isProject></Menu>
			<Container>
				<Header>
					{data.datoCmsWork.title}
				</Header>
				{
					data.datoCmsWork.tags.map((tag, i) => {
						return <TagName key={i}>{tag.tagLine}</TagName>
					})
				}
				<Desc>{data.datoCmsWork.excerpt}</Desc>
				<SliderWrapped
					style={{height: '400px'}}
					variableWidth
					// infinite={true}
					slidesToShow={2}
					nextArrow={<Arrow src={rectArrow} />} prevArrow={<Arrow src={rectArrow} reverse/>}>
					{data.datoCmsWork.gallery.map(({ fluid }) => (
						<ImageWrapper>
							<Image alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src}  />
							smagen
						</ImageWrapper>
					))}
				</SliderWrapped>
				<div
					className="sheet__body"
					dangerouslySetInnerHTML={{
						__html: data.datoCmsWork.description,
					}}
				/>
				{/* <div className="sheet__gallery">
          <Img fluid={data.datoCmsWork.coverImage.fluid} />
        </div> */}
			</Container>
		</Doc>
	</ThemeProvider>
)

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      tags {
        tagLine
      }
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      description
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      downloads {
        link
        title
      }
      video {
        url
      }
    }
  }
`
