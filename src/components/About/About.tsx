import React from 'react'
import styled from 'styled-components'
import { Fade } from 'react-reveal'
import Container from '../Shared/Container'
import Img from 'gatsby-image'
import Markdown from '../Shared/Markdown'

const Root = styled.div`
    padding: ${props => props.theme.spacing(16, 0)};
`

const Content = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.spacing(6)};
    grid-template-columns: 2fr 2fr;
    align-items: center;
    @media ${props => props.theme.media.lg} {
        grid-template-columns: 1fr ;
    }
    color: white;
`

const Image = styled(Img)`
    border: 5px solid white;
    grid-row: 1 / -1;
    width: 100%;
    padding-bottom: 100%;
    img{
        object-position: top center !important;
    }
    div{
        padding-bottom:0 !important;
    }
`

const GradiantBG = styled.div`
    margin-top: calc(-100vw / 10 * 4);
    padding-top: calc(100vw / 10 * 4);

    @media ${props => props.theme.media.lg} {
        margin-top: calc(-100vw / 8 * 3);
        padding-top: calc(100vw / 8 * 3);
    }
    @media ${props => props.theme.media.md} {
        margin-top: calc(-100vw / 6 * 3 - 2px);
        padding-top: calc(100vw / 6 * 3 - 2px);
    }
    @media ${props => props.theme.media.sm} {
        margin-top: calc(-100vw / 2 * 3 - 2px);
        padding-top: calc(100vw / 2 * 3 - 2px);
        grid-template-columns: repeat(2, 1fr);
    }
    width: 100%;
    background: #000;
    /* background-image: linear-gradient(0deg, #212121 0%, #0c0c0c calc(100% - 100vw / 10), rgba(1, 1, 1, 0)); */
`

const GradiantBGWrapper = styled.div`
    /* background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%); */
`

const Desc = styled.div`
    line-height: 1.5;
    font-weight: 400;
    strong{
        font-weight: bold;
    }
`

const Header = styled.h2`
    font-size: 36px;
    font-weight: bolder;
`

const Right = styled.div``

export default (props) => {
	return (
		<GradiantBGWrapper>
			<GradiantBG>
				<a id={'about'}/>
				<Root>
					<Container>
						<Content>
							<Image fluid={props.data.photo.fluid}/>
							<Right>
								<Header>
									<Fade bottom>
										{props.data.title}
									</Fade>
								</Header>
								<Fade bottom>
									<Desc >
										<Markdown>{props.data.bio}</Markdown>
									</Desc>
								</Fade>
							</Right>
						</Content>
					</Container>
				</Root>
			</GradiantBG>
		</GradiantBGWrapper>
	)
}

