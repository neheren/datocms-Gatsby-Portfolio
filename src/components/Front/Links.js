import React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Root = styled.div`
    height: 100%;
    display: flex;
    align-items:center;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    z-index: 10;
`

const LinkWrapper = styled.div`
    max-width: 100%;
`

const LinkItem = styled(AniLink)`
    text-decoration: none;
    color: white;
    font-weight: ${props => props.first ? 'bold' : 'normal'};
    margin-right: ${props => props.first ? props.theme.spacing(2) : props.theme.spacing(2)};
    @media ${props => props.theme.media.md} {
    	margin-left: ${props => props.first ? props.theme.spacing(0) : props.theme.spacing(1.5)};
    }
    @media ${props => props.theme.media.sm} {
        font-size: 12px;
    }
`

function Links() {
	return (
		<Root>
			<LinkWrapper>
				<LinkItem to="/" first>schlüter</LinkItem>
				<LinkItem to="/cases" swipe direction="left" duration={0.4} >cases</LinkItem>
				<LinkItem to="#about">about</LinkItem>
			</LinkWrapper>
		</Root>
	)
}

export default Links

