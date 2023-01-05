import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import projectArrow from '../../graphics/project-arrow.svg'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Root = styled.div`
    height: 100%;
    display: flex;
    align-items:center;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
`

const LinkWrapper = styled.div`
    max-width: 100%;
`
const LinkItem = styled.span`
    text-decoration: none;
    color: black;
    font-weight: ${props => props.first ? 'bold' : 'normal'};
    pointer-events: ${props => props.first ? 'all': 'none'};

    @media ${props => props.theme.media.sm} {
        font-size: 12px;
    }
    text-transform: lowercase;
`

const Arrow = styled.img`
    height: 15px;
    margin: ${props => props.theme.spacing(0, 2)};
`


function ProjectLinks(props) {
	return (
		<Root>
			<AniLink to="/cases" swipe direction="right" duration={0.4} style={{textDecoration: 'none'}}>
				<LinkItem first>cases</LinkItem>
			</AniLink>
			<Arrow src={projectArrow} />
			<LinkItem>{props.caseName}</LinkItem>
		</Root>
	)
}

ProjectLinks.propTypes = {
	caseName: PropTypes.string,
}

export default ProjectLinks

