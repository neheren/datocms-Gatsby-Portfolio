import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Fade } from 'react-reveal'
import Container from '../Shared/Container'
import Img from 'gatsby-image'

const Root = styled.div`
    padding: ${props => props.theme.spacing(16, 0)};
`

const Content = styled.div`
    grid-gap: ${props => props.theme.spacing(4)};
    grid-column: 2 / 3;
    display: grid;
    grid-template-columns: 1fr 2fr;
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
    background-image: linear-gradient(0deg, #212121 0%, #0c0c0c calc(100% - 100vw / 10), rgba(1, 1, 1, 0));
`

const GradiantBGWrapper = styled.div`
    background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
`

const Desc = styled.div`
    strong{
        font-weight: bold;
    }
`

const Header = styled.h2`
    font-size: 30px;
    font-weight: bolder;
`

const Right = styled.div``

export default (props) => {
    console.log({bio: props.data.bio})
    return (
        <GradiantBGWrapper>
            <GradiantBG>
                <a id={"about"}/>
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
                                    <Desc dangerouslySetInnerHTML={{__html: props.data.bio}}>
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

