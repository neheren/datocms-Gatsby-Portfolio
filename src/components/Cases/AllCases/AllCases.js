import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { graphql, StaticQuery  } from 'gatsby'
import CaseThump from '../CaseThump'
import Brick from '../Brick'
import Footer from '../../Footer/Footer'


const B = styled(Brick)`
    ${props => props.b && css`
        opacity: 0;
    `}
    @media ${props => props.theme.media.lg} {
        ${props => props.lg && css`
            display: none;
        `}
    }
    @media ${props => props.theme.media.md} {
        ${props => props.md && css`
            display: none;
        `}
    }
    @media ${props => props.theme.media.sm} {
        ${props => props.sm && css`
            display: none;
        `}
    }
`

const C = styled(CaseThump)`
    ${props => props.big && css`
        grid-column: auto / span 2;
        grid-row: auto / span 2;
    `}
`

const A = styled(CaseThump)`
    content: 'all projects';
`

const Root = styled.div`
    overflow:hidden;
    padding-top: 1px;
    padding-bottom: 1px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    @media ${props => props.theme.media.lg} {
        grid-template-columns: repeat(8, 1fr);
    }
    @media ${props => props.theme.media.md} {
        grid-template-columns: repeat(6, 1fr);
    }
    @media ${props => props.theme.media.sm} {
        grid-template-columns: repeat(2, 1fr);
    }
`

class AllCases extends Component {
	static propTypes = {
		work: PropTypes.any,
	}

	state = {
		chosenProject: -1,
		projectOpened: false,
	}

	openProject(index){
		this.setState({projectOpened: !this.state.projectOpened, chosenProject: index})
	}

	render() {
		const workArray = this.props.data.allDatoCmsWork.edges
			.filter(workNode => !!workNode.node.shown)
			.map((workNode) => {
			const {title, slug, coverImage} = workNode.node
			return {title, slug, coverImage}
		})

		const {chosenProject, projectOpened} = this.state;

		const p = {
			openProject: (index) => this.openProject.bind(this, index),
			projectIndex: -1,
			key: this.projectIndex,
			getProject: () => {
				p.projectIndex++
				return {case: workArray[p.projectIndex], index: p.projectIndex}
			},
			tileIndex: -1,
			getTileIndex: () => {
				p.tileIndex++
				return p.tileIndex
			},
			chosenProject,
			projectOpened,
			animate: false,
		}

		const tiles = [
			<B lg {...p} />,    <B db title={"all cases"} {...p} />,                        <B sm b {...p} />,  <B md b {...p} />,  <B sm b {...p} />,<B sm {...p} />,<B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,       <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <C {...p} />,                       <C {...p} />,       <C {...p} /> ,   <C {...p} />,    <C {...p} />,     <C {...p} />,     <B md {...p} />,    <B lg {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <C {...p} />,                       <C {...p} />,       <C {...p} /> ,   <C {...p} />,    <C {...p} />,     <C {...p} />,     <B md {...p} />,    <B lg {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <C sm {...p} />,    <B sm {...p} />,    <C sm {...p} />,    <C {...p} />,    <C sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
			<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm b {...p} />,  <B {...p} />,    <B sm {...p} />, <B sm b {...p} />,    <B md b {...p} />,  <B lg b {...p} />,
			<B lg b {...p} />,  <B md b {...p} />,  <B sm  {...p} />,   <B sm b {...p} />,  <B sm b {...p} />,  <B b {...p} />,  <B sm b {...p} />,<B sm b {...p} />,   <B md b {...p} />,  <B lg b {...p} />,
		]

		return (
			<>
				<Root>

					{
						tiles.map((tile, i) => {
							return <tile.type {...tile.props} key={i}  />
						})
					}
				</Root>
				<Footer enableBg={false} enableBorder={false} />
			</>
		)
	}
}


export default AllCases
