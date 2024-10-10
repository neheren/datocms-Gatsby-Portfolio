import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import Brick from './Brick'
import CaseThump from './CaseThump'
import { graphql, PageProps, StaticQuery } from 'gatsby'

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
    transition: 1.5s cubic-bezier(0, 0.59, 0.08, 1);

    // Add glow effect
    
    
    @keyframes rotateIn {
        0% { 
            opacity: 0;
            filter: blur(100px);
            transform: rotateY(90deg) rotateX(45deg) scale(0.8) translateZ(200px) translate(100px, -500px);
        }
        5% {
            opacity: 1;
        }
        60% {
            filter: blur(0);
        }
        100% { 
            opacity: 1;
            filter: blur(0);
            transform: rotateY(0deg) rotateX(0deg) scale(1) translateZ(0) translateY(0);
        }
    }

    perspective: 1000px;

    ${props => !props.b && css`
        opacity: 0;
        transform: rotateY(90deg) rotateX(45deg) scale(0.8) translateZ(200px) translate(100px, -500px) scale(1.8);
        box-shadow: 0 0 40px rgba(255, 255, 255, 0);
        filter: blur(100px);
        animation: rotateIn 1.5s ease-in-out forwards;
        animation-timeline: scroll(root);
        animation-range: entry ${(props.i/ 4) + 5 }% cover ${(props.i/ 50) + 30}%;
    `}
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
    background: black;
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
    scroll-timeline-name: --cases-scroll;
    scroll-timeline-axis: block;
    perspective: 1000px;
`

interface IWorkNode {
    node: {
        id: string
        shown: boolean
        title: string
        slug: string
        excerpt: string
        coverImage: {
            fluid: {
                aspectRatio: number
                src: string
                srcSet: string
                sizes: string
                base64?: string
                tracedSVG?: string
                srcWebp?: string
                srcSetWebp?: string
            }
        }
    }
}

interface IProps extends PageProps {
    data: {
        allDatoCmsWork: {
            edges: IWorkNode[]
        }
    }
}

const OuterWork: React.FC<IProps> = ({ data }) => {
    const [chosenProject, setChosenProject] = useState(-1);
    const [projectOpened, setProjectOpened] = useState(false);

    const openProject = (index: number) => {
        setProjectOpened(!projectOpened);
        setChosenProject(index);
    };

    const workArray = data.allDatoCmsWork.edges
        .filter(workNode => !!workNode.node.shown)
        .map((workNode) => {
            const { title, slug, coverImage } = workNode.node
            return { title, slug, coverImage }
        });

    let projectIndex = -1;
    let tileIndex = -1;

    const p = {
        openProject: (index: number) => () => openProject(index),
        getProject: () => {
            projectIndex++;
            return { case: workArray[projectIndex], index: projectIndex };
        },
        getTileIndex: () => {
            tileIndex++;
            return tileIndex;
        },
        chosenProject,
        projectOpened,
    };

    const tiles = [
        <B lg {...p} />,    <B db title={'cases'} {...p} />,                        <B sm b {...p} />,  <B md b {...p} />,  <B sm b {...p} />,<B sm {...p} />,<B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
        <B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,       <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
        <B lg {...p} />,    <B md {...p} />,    <C big {...p} />,                       <C {...p} />,       <C {...p} /> ,   <C {...p} />,    <A{...p} />,         <B md {...p} />,    <B lg {...p} />,
        <B lg {...p} />,    <B md {...p} />,                                            <C b {...p} />,     <C {...p} />,    <C {...p} />,    <C no {...p} />,         <B md {...p} />,    <B lg {...p} />,
        <B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg {...p} />,
        <B lg {...p} />,    <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B {...p} />,    <B sm {...p} />, <B sm {...p} />,      <B md {...p} />,    <B lg b {...p} />,
        <B lg b {...p} />,  <B md {...p} />,    <B sm {...p} />,    <B sm {...p} />,    <B sm b {...p} />,  <B {...p} />,    <B sm {...p} />, <B sm b {...p} />,    <B md b {...p} />,  <B lg b {...p} />,
        <B lg b {...p} />,  <B md b {...p} />,  <B sm  {...p} />,   <B sm b {...p} />,  <B sm b {...p} />,  <B b {...p} />,  <B sm b {...p} />,<B sm b {...p} />,   <B md b {...p} />,  <B lg b {...p} />,
    ]

    return (
        <Root>
            {tiles.map((tile, i) => <tile.type {...tile.props} key={i} i={i} />)}
        </Root>
    );
};

export default () => (
    <StaticQuery
        query={graphql`
          query OuterWorkQuery {
            allDatoCmsWork(sort: { fields: [position], order: ASC }) {
              edges {
                node {
                  id
                  shown
                  title
                  slug
                  excerpt
                  coverImage {
                    fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
                      ...GatsbyDatoCmsSizes
                    }
                  }
                }
              }
            }
          }
        `}
        render={(data) => <OuterWork data={data} />}
    />
)
