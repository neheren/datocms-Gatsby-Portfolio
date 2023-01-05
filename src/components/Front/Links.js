import React from 'react'
import styled from 'styled-components'

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
const LinkItem = styled.a`
    text-decoration: none;
    color: black;
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
				<LinkItem href="/" first>schlüter</LinkItem>
				<LinkItem href="/cases">cases</LinkItem>
				<LinkItem href="/">expirience</LinkItem>
			</LinkWrapper>
		</Root>
	)
}

Links.propTypes = {

}

export default Links

