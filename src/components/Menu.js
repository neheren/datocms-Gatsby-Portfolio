import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import MenuOverlay from './MenuOverlay';
import { window } from 'global'

const BURGER_STATES = {
	ARROW: 'ARROW',
	BURGER: 'BURGER',
	EXIT: 'EXIT',
}

const Burger = styled.div`
    width: ${props => props.theme.spacing(4)};
    height: ${props => props.theme.spacing(4)};
    left: ${props => props.theme.spacing(4)};
    top: ${props => props.theme.spacing(4)};
    position: fixed;
    display: inline;
    z-index: 3000;
    transition: 0.5s cubic-bezier(0.75, 0, 0.26, 0.98);

    @media ${props => props.theme.media.md} {
        left: ${props => props.theme.spacing(2)};
        top: ${props => props.theme.spacing(2)};
    }

    ${props => props.burgerState !== BURGER_STATES.ARROW ? css`
        cursor: pointer;
        * {
            backdrop-filter: invert(1) grayscale(1);
        }
    ` : css`
        * {
            background-color: ${props => !props.isProject ? 'white' : 'black'};
        }
    `}
    
    ${props => props.isProject && css`
        cursor: pointer;

    `}

    ${props => props.burgerState === BURGER_STATES.ARROW ? css`
        transform: rotate(${props.isProject ? '-180deg' : '0deg'} );
    ` : css`
        transform: rotate(${props.isProject ? '0deg' : '180deg'} );
    `}
`

const Line = styled.div`
    z-index: 1000;
    height: 2px;
    width: 100%;
    position: absolute;
    transition: 0.5s cubic-bezier(0.75, 0, 0.26, 0.98), background-color 0.3s linear;
    margin: auto;

    ${props => props.top && css`
        /* x */
        ${props => props.burgerState === BURGER_STATES.EXIT && css` 
            width: 0;
            top:0;
            right: 0;
            left: 0;
            bottom:0;
            /* opacity:0; */
        `}

        /* = */
        ${props => props.burgerState === BURGER_STATES.BURGER && css` 
            right: 0;
            left: 0;
            bottom: calc(100% - 5px);

            opacity:1;
        `}

        /* -> */
        ${props => props.burgerState === BURGER_STATES.ARROW && css` 
            transform: rotate(45deg);
            width: 30%;
            bottom: 56%;
            left: 75%;
        `}
    `}

    ${props => props.bottom && css`
        /* x */
        ${props => props.burgerState === BURGER_STATES.EXIT && css` 
            width: 0;
            top:0;
            bottom:0;
            /* opacity:0; */
            right: 0;
            left: 0;
        `}

        /* = */
        ${props => props.burgerState === BURGER_STATES.BURGER && css` 
            right: 0;
            left: 0;
            top: calc(100% - 5px);
            /* bottom:5px; */
            opacity:1;
        `}

        /* -> */
        ${props => props.burgerState === BURGER_STATES.ARROW && css` 
            transform: rotate(-45deg);
            right: 0;
            width: 30%;
            left: 75%;
            top: 56%;
        `}
    `}


`


const CrossPart = styled.div`
    height: 2px;
    width: 100%;
    position: absolute;
    transition: 0.5s cubic-bezier(0.75, 0, 0.26, 0.98), background-color 0.3s linear;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: ${props => props.rev ? 1 : 0};
    ${props => props.burgerState === BURGER_STATES.EXIT && css`
        opacity: 1;
        transform: ${props => props.rev ? 'rotate(-45deg)' : 'rotate(45deg)'};
    `}

`


const Menu = ({ isProject }) => {
	const [lineColor, setLineColor] = useState('white')
	const [burgerState, setBurgerState] = useState(BURGER_STATES.ARROW)

	useEffect(() => {
		const handleScroll = () => {
			setBurgerState(shouldDisplayArrow() ? BURGER_STATES.ARROW : BURGER_STATES.BURGER)
			setLineColor(window.pageYOffset > window.innerHeight * 2 || burgerState === BURGER_STATES.EXIT ? 'white' : 'white')
		}

		window.addEventListener('scroll', handleScroll, true)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [burgerState])

	const shouldDisplayArrow = () => {
		return window.pageYOffset < 8
	}

	const toggleCollapsed = () => {
		if (window.pageYOffset < 8) {
			if (isProject) {
				if(window.location.pathname.includes('cases')) {
					window.location.href = '/'
				} else {
					window.history.back()
				}
			}
			return
		}

		setBurgerState(prevState => 
			prevState === BURGER_STATES.EXIT 
				? shouldDisplayArrow() ? BURGER_STATES.ARROW : BURGER_STATES.BURGER 
				: BURGER_STATES.EXIT
		)
	}

	return (
		<>
			{burgerState === BURGER_STATES.EXIT && <MenuOverlay onClose={toggleCollapsed} />}
			<Burger isProject={isProject} onClick={toggleCollapsed} burgerState={burgerState}>
				<Line top burgerState={burgerState} bgColor={lineColor}></Line>
				<Line bottom burgerState={burgerState} bgColor={lineColor}></Line>
				<CrossPart burgerState={burgerState} bgColor={lineColor}/>
				<CrossPart rev burgerState={burgerState} bgColor={lineColor}/>
			</Burger>
		</>
	)
}

Menu.propTypes = {
	isProject: PropTypes.bool,
}

export default Menu
