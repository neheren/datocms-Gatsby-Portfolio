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
`

const Rotation = styled.div`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    transform-origin: center;
`

const Line = styled.div`
    height: 30px;
    width: 2px;
    background-color: black;
    align-self: end;
`

const Bold = styled.div`
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