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
    font-size: 12px;
    color: dimgrey;
`

const Rotation = styled.div`
	writing-mode: vertical-lr;
	transform: rotate(180deg);
	transform-origin: center;
  	font-size: 10px;
`

const Line = styled.div`
    height: 30px;
    width: 1px;
    background-color: dimgrey;
    align-self: end;
`

const Bold = styled.div`
	color: black;
    font-weight: bolder;
  
`
const Copyright = () => {
	return (
		<Root>
			<Rotation>
				<Bold>
					nikolaj schlüter nielsen
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
