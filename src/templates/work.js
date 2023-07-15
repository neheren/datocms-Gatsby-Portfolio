import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Front from '../components/Front'
import styled, { ThemeProvider, css } from 'styled-components'
import theme from '../styles/theme'
import Container from '../components/Shared/Container'
import rectArrow from '../graphics/rect-arrow.svg'
import TagName from './Work/Tag'
import Menu from '../components/Menu'
import { Swiper, SwiperSlide } from 'swiper/react';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ReactMarkdown from 'react-markdown'
import {usePreLoader} from '../hooks/usePreloader'




const Doc = styled.div`
  background-color: #EFEFEF;
`


const ModifiedSlider = styled(Slider)`

`
const DotWrapper = styled.div`
  	padding: 0px 8px 8px;
	cursor: pointer;
`

const Dot = styled.div`
	height: 8px;
	width: 8px;
	background-color: #bbb;
  border-radius: 50%;
  ${props => props.active && css`
	background-color: #717171;
  `}
  
`



const Header = styled.h1`
  margin: ${props => props.theme.spacing(4, 0, 0, 0)};
  font-size: 80px;
  font-weight: bolder;
  color: black;
  text-transform: lowercase;
`

const Desc = styled.p`
  font-size: 19px;
  font-weight: 400;
  
  margin: ${props => props.theme.spacing(2, 0)};
`

const Image = styled.img`
	border-radius: 10px;
	overflow: hidden;
  height: 500px;

`

const ImageWrapper = styled.span`
  height: 500px;
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


const responsive = {
	0: { items: 1 },
	1024: { items: 2 },
};


const Work = ({ data }) => {
	const items = data.datoCmsWork.gallery.map(({ fluid }) => (
		<ImageWrapper>
			<Image alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} draggable="false"  />
		</ImageWrapper>

	))

	const {didPreload} = usePreLoader(data.datoCmsWork.gallery.map(({ fluid }) => ({
		url: fluid.src,
		type: 'image',
	})))


	return (
		<ThemeProvider theme={theme}>
			<Front
				isProject
				videoLink={data.datoCmsWork.video ? data.datoCmsWork.video.url : ''}
				caseName={data.datoCmsWork.title}
			/>
			<HelmetDatoCms seo={data.datoCmsWork.seoMetaTagsseoMetaTags}/>
			<Doc>
				<Menu isProject></Menu>
				<Container>
					<Header>{data.datoCmsWork.title}</Header>
					{
						data.datoCmsWork.tags.map((tag, i) => {
							return <TagName key={i}>{tag.tagLine}</TagName>
						})
					}
					{data.datoCmsWork.excerpt && <Desc>{data.datoCmsWork.excerpt}</Desc>}
					{didPreload && items.length !== 0 && <div style={{borderRadius: '10px', overflow: 'hidden'}}>
						<AliceCarousel
							mouseTracking
							items={items}
							autoPlay
							autoPlayInterval={2000}
							// responsive={responsive}
							autoWidth
							infinite
							renderDotsItem={(dot) => {
								return <DotWrapper>
									<Dot active={dot.isActive}/>
								</DotWrapper>
							}}
							disableButtonsControls
							controlsStrategy="alternate"
						/>
					</div>}

					<ReactMarkdown className="sheet__body">
						{data.datoCmsWork.description}
					</ReactMarkdown>

					{/* <div className="sheet__gallery">
          <Img fluid={data.datoCmsWork.coverImage.fluid} />
        </div> */}
				</Container>
			</Doc>
		</ThemeProvider>
	)
}
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


export default Work
