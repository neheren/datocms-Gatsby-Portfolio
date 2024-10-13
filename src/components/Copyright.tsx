import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
	position: absolute;
	bottom: 0;
	transform: translateX(-50%);
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: 1fr;
	grid-gap: 5px;
	color: #fff;
	z-index: 10;
`

const Rotation = styled.div`
	writing-mode: vertical-lr;
	transform: rotate(180deg);
	transform-origin: center;
	font-size: 12px;
`

const Line = styled.div`
	height: 16px;
	width: 1px;
	background-color: white;
	align-self: end;
`

const Bold = styled.div`
	color: #fff;
	font-size: 14px;
	font-weight: bolder;
  
`
const Copyright = () => {
	return (
		<Root>
			<Rotation>
				<Bold>
					nikolaj schlüter
				</Bold>
				designed and created by
			</Rotation>
			<Line></Line>
		</Root>
	)
}

Copyright.propTypes = {

}

export default Copyright
