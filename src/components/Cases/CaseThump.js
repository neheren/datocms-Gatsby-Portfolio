import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import HoverTransformer from '../HoverTransformer'
import arrow from '../../graphics/arrow-white.svg'
import arrowRound from '../../graphics/arrowRound.svg'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import slytLogo from '../../graphics/slytBlack.svg'
import Brick from './Brick'

const Root = styled.div`
    position: relative;
    width: 100%;
    overflow:hidden;
    background: url(${props => props.image + '?w=500&h=500'});
    background-size:cover;  
    background-position: center;
    font-weight: bolder;

    :after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    filter: brightness(1) contrast(1.1);
    transition: 0.5s cubic-bezier(0, 0.59, 0.08, 1);
   ${props => props.no ? css`
	background: white;
	` : css`
	   :hover {
	      filter: brightness(0.9);
	   }
	`}

`

const Content = styled.div`
    position: absolute;
    top:5px;
    bottom:5px;
    left:5px;
    right:5px;
`

const Arrow = styled.img`
    position: absolute;
    width: 20%;
    transform: translateZ(40px);
    ${props => props.big ? css`
        filter: drop-shadow(0 0 10px rgba(0,0,0, 0.4));
        right: 30px;
        bottom: 30px;
    ` : css`
        right: 15px;
        bottom: 15px;
	    opacity: ${props.no ? 1 : 0};
        font-size: 15px;
        filter: drop-shadow(0 0 5px rgba(0,0,0, ${props.no ? 0 : 0.4})) ${props.no && 'invert(1)'}
    `};
    ${props => props.no && css`
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 35%;
	`};
    pointer-events: none;
`
const Title = styled.h3`
    pointer-events: none;
    transition: 0.5s cubic-bezier(0, 0.59, 0.08, 1);
    color: ${props => props.no ? 'black' : 'white'};
    position: absolute;
    width: 60%;
    ${props => props.big ? css`
        left: 30px;
        bottom: 25px;
        font-size: 25px;
        filter: drop-shadow(0 0 10px rgba(0,0,0, 0.9));
    ` : css`
        left: 15px;
        bottom: 10px;
        opacity: ${props.no ? 1 : 0};
        font-size: 15px;
        filter: drop-shadow(0 0 5px rgba(0,0,0, ${props.no ? 0 : 0.9}))

    `};
    transform: translateZ(40px);
    b {
        font-weight:bolder;
    }
    ${props => props.no && css`
		width: 100%;
	`}
`

const HoverTransformerWrapper = styled(HoverTransformer)`
    cursor: pointer;
    transition: 0.5s cubic-bezier(0, 0.59, 0.08, 1);
    :hover{
        transform: translateZ(0px) scale3d(0.90, 0.90, 0.90);
        ${Title}{
            opacity: 1 !important;
        }
        ${Arrow}{
            opacity: 1 !important;
        }
    }
    :active {
        transform: translateZ(0px) scale3d(0.85, 0.85, 0.85);
    }
`


const CaseThump = (props) => {
	const project = props.no ? {
		index: 'all',
		case: {
			slug: '',
			title: 'see <b>all cases</b>'
		}
	} : props.getProject()

	if(!project.case) {
		return <Brick {...props}/>
	}

	// const largeArrow = (props.no || props.big)

	return (
		<HoverTransformerWrapper className={props.className} >
			<Arrow no={props.no} src={arrow} big={props.big} />
			<Title no={props.no} big={props.big}> {
				props.big ? <>
					<b>latest </b><span>case</span>
				</> : <span dangerouslySetInnerHTML={{__html: project.case.title}} />
			}
			</Title>
			<AniLink
				onClick={props.openProject(project.index)}
				cover
				bg={`
                    url(${slytLogo})
                    center / 15%   /* position / size */
                    no-repeat        /* repeat */
                    fixed            /* attachment */
                    padding-box      /* origin */
                    content-box      /* clip */
                    white            /* color */
                `}
				color="white"
				direction="down"
				delay={5}
				entry={{
					delay: 0.5
				}}
				duration={1}

				to={'/cases/' + project.case.slug}>

				<Root className={props.className} no={props.no} image={(props.no || project && project.case.coverImage.fluid?.src) || null}>
					<Content>
					</Content>
				</Root>
			</AniLink>
		</HoverTransformerWrapper>
	)
}

CaseThump.propTypes = {
	className: PropTypes.string,
	blank: PropTypes.bool,
	big: PropTypes.bool,
	no: PropTypes.bool,
	openProject: PropTypes.func,
	getProject: PropTypes.func,
}

export default CaseThump
