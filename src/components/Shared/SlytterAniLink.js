import React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import slytLogo from '../../graphics/slytBlack.svg'
import PropTypes from 'prop-types'




const SlytterAniLink = (props) => {

	const {children, onClick} = props

	return (
		<AniLink
			onClick={onClick}
			cover
			bg={`
                    url(${slytLogo})
                    center / 15%   /* position / size */
                    no-repeat        /* repeat */
                    fixed            /* attachment */
                    padding-box      /* origin */
                    content-box      /* clip */
                    white            /* color */
                `}
			color="white"
			direction="down"
			delay={5}
			entry={{
				delay: 0.5
			}}
			duration={1}
			to={props.to}
		>
			{children}
		</AniLink>
	)
}

SlytterAniLink.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node,
	to: PropTypes.string
}



export default SlytterAniLink
