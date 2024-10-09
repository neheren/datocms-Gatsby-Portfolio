import React from 'react'
import styled, {css} from 'styled-components'
import Brick from './Cases/Brick'
import CaseThump from './Cases/CaseThump'

const Root = styled.div`
  background-image: linear-gradient(180deg, #212121 0%, #1c1c1c calc(100% - 100vw / 10), rgba(1, 1, 1, 0));
  overflow: hidden;
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


const HeaderSection = <div>

</div>


export const Tiles = () => {
	const p = {
		getTileIndex: () => 1,
	}

	const tiles = [
		// <B lg {...p} />,    <B md {...p} />,                        <B sm b {...p} />,  <B md b {...p} />,  <B sm b {...p} />,<B sm {...p} />,<B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
		<B lg {...p} />,    <B md {...p} />,    <B sm  b {...p} />,    <B sm b {...p} />,    <B b {...p} />,       <B b {...p} />,    <B sm {...p} />, <B b sm {...p} />,      <B b md {...p} />,   <B lg {...p} b />,
		<B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B b {...p} />,       <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md b {...p} />,   <B lg {...p} />,
		<B lg {...p} />,    <B {...p} db>{HeaderSection}</B>,   <B sm {...p} />,    <B {...p} sm />,       <B {...p} md/>,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} d />,   <B lg {...p} />,
	]

	return (
		<Root>
			{
				tiles.map((tile, i) => <tile.type {...tile.props} key={i}/>)
			}
		</Root>
	)

}
