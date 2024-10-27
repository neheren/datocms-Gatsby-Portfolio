import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Root = styled.div`
  position: relative;
  display: grid;
  ${props => !props.fluid && css`
    grid-template-columns: 1fr 435px 435px 1fr;
    @media ${props.theme.media.lg} {
      grid-template-columns: 1fr 272px 272px 1fr;
    }
    @media ${props.theme.media.md} {
      grid-template-columns: 1fr 200px 200px 1fr;
    }
    @media ${props.theme.media.sm} {
      grid-template-columns: ${props.theme.spacing(2)} 1fr 1fr ${props.theme.spacing(2)};
    }
  `}
`

const Content = styled.div`
  grid-column: 2 / 4;
`

const Container = ({
  children,
}) => (
  <Root>
		<Content>
			{children}
    </Content>
  </Root>
)

Container.propTypes = {
  children: PropTypes.any,
}

export default Container
