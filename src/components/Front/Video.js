import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const PlayerWrapper = styled.div`
    ${props => props.overSized && css`
        transform: translateX(-10%)
    `};
    object-fit: cover;
`

const BlurWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(var(--blur-amount, 0px));
  transition: filter 0.2s ease-out;
`

const RP = styled(ReactPlayer)` 
	* {
		object-fit: cover;
	}
	width: 100%;
    position: fixed;
	height: 100%;
    
`

function Video(props) {
    const [blurAmount, setBlurAmount] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const maxBlur = 10 // Maximum blur in pixels
            const scrollThreshold = 200 // Scroll distance for max blur
            const newBlurAmount = Math.min(scrollY / scrollThreshold * maxBlur, maxBlur)
            setBlurAmount(newBlurAmount)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isProject = props.isProject || false

    return (
        <BlurWrapper style={{ '--blur-amount': `${blurAmount}px` }}>
            <RP
                loop={!isProject}
                muted
                height="inherit"
                width="inherit" controls={isProject} playsinline={isProject} playing url={props.videoLink}  />
        </BlurWrapper>
    )
}

Video.propTypes = {
    videoLink: PropTypes.string,
    isProject: PropTypes.bool,
    overSized: PropTypes.bool,
}

export default Video
