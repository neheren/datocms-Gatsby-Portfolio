import React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'


const Root = styled.div`
	display: grid;
	overflow: hidden;
	grid-template-rows: ${props => props.theme.spacing(12)};
	grid-template-columns: ${props => props.theme.spacing(12)} auto ${props => props.theme.spacing(12)};
	position: relative;
	
	@media ${props => props.theme.media.md} {
		grid-template-rows: ${props => props.theme.spacing(8)};
		grid-template-columns: ${props => props.theme.spacing(8)} auto ${props => props.theme.spacing(8)};
	}
`

const UpperLeft = styled.div`
	grid-row: 1;
	grid-column: 2;
	display: flex;
	align-items: center;
	height: 100%;
`

const Arrow = styled.img`
    height: 15px;
    margin: ${props => props.theme.spacing(0, 2)};
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


export const AllCasesHeader = () => {
	return (
		<Root>
			<UpperLeft>
				<AniLink to="/" swipe direction="right" duration={0.4} style={{textDecoration: 'none'}}>
					<LinkItem first>schlüter</LinkItem>
				</AniLink>

				<Arrow/>
			</UpperLeft>
		</Root>
	)
}
