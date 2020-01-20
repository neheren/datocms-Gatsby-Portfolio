import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import slytLogo from '../../graphics/slyt.svg'
import arrowDown from '../../graphics/downArrow.svg'
import Links from './Links'
import Copyright from '../Copyright'
import HoverTransformer from '../HoverTransformer'
import InlineVideo from './Video'

const Root = styled.div`
    display: grid;
    background: #EFEFEF;
    grid-template-columns: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(12)};
    grid-template-rows: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(12)};
    height: 100vh;
    position: relative;
    @media ${props => props.theme.media.md} {
	    grid-template-columns: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(8)};
	    grid-template-rows: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(8)};

	}
`

const Video = styled.div`
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
	height: 100%;
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    @media ${props => props.theme.media.md} {
    	grid-column: 1 / 4;
    }

`

const Hover = styled(HoverTransformer)`
    background: #EFEFEF;

    grid-column: 2 / 3;
    grid-row: 2 / 3;
    height: 100%;
    width: 100%;
//    position: absolute;
    display: flex;

`

const MenuWrapper = styled.div`
    margin: ${props => props.theme.spacing(4)};
    justify-self: center;
    align-self: center;
`

const Logo = styled.img`
    padding: 50px;
    transform: translateZ(250px);
    width: 200px;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: auto;
    z-index: 1000;
`

const CopyrightWrapper = styled.div`
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    position: relative;
    justify-self: center;
    @media ${props => props.theme.media.md} {
    	display:none;
    }
`

const ArrowDown = styled.img`
    cursor: pointer;
    @keyframes hoverfx {
        0%{
            transform:translateY(-5px);
        }
        50%{
            transform:translateY(5px);
        }
        100%{
            transform:translateY(-5px);
        }
    }
    justify-self: center;
    align-self: center;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    width: 20px;
    padding: ${props => props.theme.spacing(1, 2)};
    animation: hoverfx 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
`

const scrollDown = () => {
	window.scrollTo({
		top: window.innerHeight,
		behavior: 'smooth'
	})
}

const front = (props) => {
	const { isProject } = props || false
	return (
		<Hover scale={10} disable={isProject}>
			<Root>
				<MenuWrapper />
				<CopyrightWrapper>
					{!isProject && <Copyright />}
				</CopyrightWrapper>
				<Links/>
					<Video>
						<InlineVideo videoLink={props.videoLink} isProject={isProject} style={{transform: 'translateZ(150px) translateX(-10%)'}} />
						{!isProject && <Logo src={slytLogo} />}
					</Video>
				<ArrowDown src={arrowDown} onClick={scrollDown.bind(this)}/>
			</Root>
		</Hover>
	)
}

front.propTypes = {
	videoLink: PropTypes.string,
	isProject: PropTypes.bool,
}

export default front
