import React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Root = styled.div`
    height: 100%;
    display: flex;
    align-items:center;
    grid-column: 2 / 4;
    grid-row: 1 / 2;
    z-index: 10;
`

const LinkWrapper = styled.div`
    max-width: 100%;
`

const LinkItem = styled.a`
    text-decoration: none;
    color: white;
    font-weight: ${props => props.first ? 'bold' : 'normal'};
    margin-right: ${props => props.theme.spacing(4)};
    
    cursor: ${props => props.first ? 'cell' : 'pointer'};
    @media ${props => props.theme.media.md} {
        margin-left: ${props => props.first ? props.theme.spacing(0) : props.theme.spacing(1.5)};
    }
    @media ${props => props.theme.media.md} { 
        margin-right: ${props => props.theme.spacing(2)};
        margin-left: ${props => props.theme.spacing(0)};
    }
    padding: 16px 0;
`

function Links() {
	return (
		<Root>
			<LinkWrapper>
				<LinkItem href="/" first>schlüter</LinkItem>
				<LinkItem href="/cases" swipe direction="left" duration={0.4} >cases</LinkItem>
				<LinkItem href="#about">about</LinkItem>
			</LinkWrapper>
		</Root>
	)
}

export default Links

