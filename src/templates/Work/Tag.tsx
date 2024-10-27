import React from 'react'
import styled from 'styled-components'


const Inner = styled.span`
	/* background: #3c3c3c; */
	border-radius: 220px;
	display: inline-block;
	font-weight: 400;
	text-transform: capitalize;
	font-size: 14px;
	color: #1e1e1e;
	margin-right: ${props => props.theme.spacing(1)};
	margin-bottom: ${props => props.theme.spacing(1)};
	padding: ${props => props.theme.spacing(0.4, 2)};
	outline: 1px solid #3c3c3c;
`

interface TagProps {
	children: string;
}

const Tag: React.FC<TagProps> = ({ children }) => {
	return (
		<Inner>
			{children}
		</Inner>
	)
}


export { Tag }
