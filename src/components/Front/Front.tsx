import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import slytLogo from '../../graphics/slyt.svg'
import nikoLogo from '../../graphics/nikolaj.svg'
import arrowDown from '../../graphics/downArrow.svg'
import Links from './Links'
import Copyright from '../Copyright'
import { VideoComponent } from './Video'
import ProjectLinks from './ProjectLinks'
import Rive, { useRive } from '@rive-app/react-canvas';

const Root = styled.div`
    display: grid;
    background: ${props => !props.isProject ? '#000' : '#EFEFEF'};
    grid-template-columns: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(12)};
    grid-template-rows: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(12)};
    height: 100vh;
    position: relative;
    @media ${props => props.theme.media.md} {
	    grid-template-columns: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(8)};
	    grid-template-rows: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(8)};
	}
`

const FallbackRoot = styled.div`
  display: grid;
    background: #EFEFEF;
    grid-template-columns: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(0)};
    grid-template-rows: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(0)};
    position: relative;
    @media ${props => props.theme.media.md} {
	    grid-template-columns: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(0)};
	    grid-template-rows: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(0)};
	}
`

const Video = styled.div`
  	background-color: black;
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


const MenuWrapper = styled.div`
    margin: ${props => props.theme.spacing(4)};
    justify-self: center;
    align-self: center;
`

const LogoImg = styled.div`
    padding: 50px;
    transform: translateZ(250px);
    max-width: 600px;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: auto;
    z-index: 1000;
`



const RiveAnimation = () => {
    const { rive, RiveComponent } = useRive({
        src: '/slytter.riv',
        autoplay: true,
      });
    

    return <LogoImg>
        <RiveComponent />
    </LogoImg>
}

const CopyrightWrapper = styled.div`
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    position: relative;
    justify-self: center;
    @media ${props => props.theme.media.md} {
    	display:none;
    }
`

const ArrowDown = styled.img<{black?: boolean}>`
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
    filter: ${props => props.black ? 'invert(1)' : 'none'};
    z-index: 1000;
`

const scrollDown = () => {
	window.scrollTo({
		top: window.innerHeight,
		behavior: 'smooth'
	})
}

const Front = (props) => {
	const { isProject } = props || false

	const [firstNameShown, setFirstNameShown] = useState(0)
	useEffect(() => {
		const timer = setInterval(() => {
			setFirstNameShown((value) => (value + 1) % 4)
		}, 300)
		return () => clearInterval(timer)

	}, [])



	if(!props.videoLink) {
		return <FallbackRoot>
			<MenuWrapper />
			{isProject ? <ProjectLinks caseName={props.caseName} /> : < Links/>}

		</FallbackRoot>
	}

	return (
		<Root isProject={isProject}>
			<MenuWrapper />
			<CopyrightWrapper>
				{!isProject && <Copyright />}
			</CopyrightWrapper>
			{isProject ? <ProjectLinks caseName={props.caseName} /> : < Links/>}
			<Video>
				<VideoComponent videoLink={props.videoLink} isProject={isProject} />
				{!isProject && <RiveAnimation src={firstNameShown === 0 ? nikoLogo : slytLogo} />}
			</Video>
			<ArrowDown src={arrowDown} onClick={scrollDown.bind(this)} black={isProject}/>
		</Root>
	)
}

Front.propTypes = {
	caseName: PropTypes.string,
	videoLink: PropTypes.string,
	isProject: PropTypes.bool,
}

export default Front
