import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Inner = styled.span`
background: #3c3c3c;
		border-radius: 220px;
		display: inline-block;
		font-weight: bold;
  text-transform: capitalize;
		font-size: 14px;
		color: white;
		margin-right: ${props => props.theme.spacing(1)};
		margin-bottom: ${props => props.theme.spacing(1)};
	padding: ${props => props.theme.spacing(0.8, 3)};
`

class MyComponent extends Component {
	render() {
		return (
				<Inner>
					{this.props.children}
				</Inner>
		)
	}
}

MyComponent.propTypes = {
	children: PropTypes.string,
}

export default MyComponent
