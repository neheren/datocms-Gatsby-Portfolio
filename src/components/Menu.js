import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'gatsby-plugin-transition-link';
import MenuOverlay from './MenuOverlay';
import { window } from 'global'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

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
            background-color: black;
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
        transform: ${props => props.rev ? 'rotate(-45deg)' : 'rotate(45deg)'}
    `};

`


export default class Menu extends Component {
    static propTypes = {
        isProject: PropTypes.bool,
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this), true);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    state = {
        LineColor: 'black',
        burgerState: BURGER_STATES.ARROW,
        burgerIndex: 1,
    }

    handleScroll() {
        this.setState({
            burgerState: this.shouldDisplayArrow () ? BURGER_STATES.ARROW : BURGER_STATES.BURGER,
        })
        this.setState({
            LineColor: (window.pageYOffset > window.innerHeight * 2 || this.state.burgerState === BURGER_STATES.EXIT ? 'white' : 'black')
        })
    }

    shouldDisplayArrow () {
        return window.pageYOffset < 8
    }

    toggleCollapsed (){
        if(window.pageYOffset < 8) {
            if(this.props.isProject) {
                window.history.back();
            }
            // navigate back with window.history
            return
        }

        this.setState({
            burgerState: this.state.burgerState === BURGER_STATES.EXIT ? this.shouldDisplayArrow () ? BURGER_STATES.ARROW : BURGER_STATES.BURGER : BURGER_STATES.EXIT,
        })
    }

    render() {
        return (
            <>
            {this.state.burgerState === BURGER_STATES.EXIT && <MenuOverlay onClose={this.toggleCollapsed.bind(this)} />}
            <Burger isProject={this.props.isProject} onClick={this.toggleCollapsed.bind(this)} burgerState={this.state.burgerState}>
                <Line collapsed={this.state.collapsed} top burgerState={this.state.burgerState} bgColor={this.state.LineColor}></Line>
                <Line collapsed={this.state.collapsed} bottom burgerState={this.state.burgerState} bgColor={this.state.LineColor}></Line>
                <CrossPart collapsed={this.state.collapsed} burgerState={this.state.burgerState} bgColor={this.state.LineColor}/>
                <CrossPart collapsed={this.state.collapsed} rev burgerState={this.state.burgerState} bgColor={this.state.LineColor}/>
            </Burger>
            </>
        )
    }
}
