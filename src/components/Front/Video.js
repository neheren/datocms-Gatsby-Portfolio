import React from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const PlayerWrapper = styled.div`
    ${props => props.overSized && css`
        transform: translateX(-10%)
    `};
    object-fit: cover;
`

const RP = styled (ReactPlayer)` 
	* {
		object-fit: cover;
	}
	width: 100%;
	height: 100%;
    
`



function Video(props) {
    const isProject = props.isProject || false
    return (
		<RP
            loop={!isProject}
            muted
            height="inherit"
            width="inherit" controls={isProject} playsinline={isProject} playing url={props.videoLink}  />
    )
}

Video.propTypes = {
    videoLink: PropTypes.string,
    isProject: PropTypes.bool,
    overSized: PropTypes.bool,
}

export default Video
