import React from 'react'
import styled, {css} from 'styled-components'
import Brick from '../Cases/Brick'
import CaseThump from '../Cases/CaseThump'

const Root = styled.div`
    background-color: rgba(1, 0, 0, 1);
    overflow:hidden;
    padding-top: 1px;
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

const C = styled(CaseThump)`
    ${props => props.big && css`
        grid-column: auto / span 2;
        grid-row: auto / span 2;
    `}
`

const A = styled(CaseThump)`
    content: 'all projects';
`

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


export const Footer = () => {

	const p = {
		getTileIndex: () => 1,
	}

	const tiles = [
		<B lg {...p} />,    <B db {...p} />,                        <B sm b {...p} />,  <B md b {...p} />,  <B sm b {...p} />,<B sm {...p} />,<B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
		<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,       <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
		<B lg {...p} />,    <B md {...p} />,    <C sm {...p} />,                       <C {...p} />,       <C {...p} /> ,   <C {...p} />,    <A{...p} />,         <B md {...p} />,    <B lg {...p} />,
		<B lg {...p} />,    <B md {...p} />,                                            <C b {...p} />,     <C {...p} />,    <C {...p} />,    <C no {...p} />,         <B md {...p} />,    <B lg {...p} />,
		<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <C sm {...p} />,    <C {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
		<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
		<B lg b {...p} />,  <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm b {...p} />,  <B {...p} />,    <B sm {...p} />, <B sm b {...p} />,    <B md b {...p} />,  <B lg b {...p} />,
		<B lg b {...p} />,  <B md b {...p} />,  <B sm  {...p} />,   <B sm b {...p} />,  <B sm b {...p} />,  <B b {...p} />,  <B sm b {...p} />,<B sm b {...p} />,   <B md b {...p} />,  <B lg b {...p} />,
	]

	return (
		<>
			<Root>
				{
					tiles.map((tile, i) => <tile {...tile.props} key={i}/>)
				}
			</Root>
		</>
	)
  //
	// return (
	// <footer>
	// 	<Root>
	// 		<B lg {...p} />, <B db {...p} />, <B sm b {...p} />,  <B md b {...p} />,  <B sm b {...p} />,<B sm {...p} />,<B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
	// 	</Root>
	//   <p>© {new Date().getFullYear()} Nikolaj Schlüter Nielsen</p>
	// </footer>
  // )
}
