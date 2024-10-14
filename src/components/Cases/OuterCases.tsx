import React, { useState, useRef, useEffect } from 'react'
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
    @keyframes rotateIn${props => props.blur ? 'Blur' : ''} {
        0% {
            opacity: 0;
            filter: blur(${props => props.blur ? 50 : 0}px);
            transform-origin: center;
            transform: rotateY(-90deg) rotateX(-0deg) rotateY(30deg) translate3d(100px, -500px, -100px);
        }
        5% {
            opacity: 1;
        }
        40% {
            filter: blur(0);
        }
        100% { 
            opacity: 1;
            transform: rotateY(0deg) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0);
        }
    }

    transform-style: preserve-3d;
    transform-origin: center;
    perspective: 1000px;

    ${props => !props.b && css`
        opacity: 0;
        animation: rotateIn${props => props.blur ? 'Blur' : ''} 1s ease-out forwards;
        will-change: transform, filter;
        animation-play-state: paused;
        animation-delay: calc(var(--scroll) * -1s);
        animation-iteration-count: 1;
        animation-fill-mode: both;
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

    @keyframes blurOut {
        0% {
            filter: blur(10px);
        }
        100% {
            filter: blur(0);
        }
    }
    animation: blurOut 1s ease-in-out forwards;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -1s);
    animation-iteration-count: 1;
    animation-fill-mode: both;
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = Math.min(window.scrollY / window.innerHeight, 1);
            document.documentElement.style.setProperty('--scroll', scrollPercentage.toString());
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root>
            {tiles.map((tile, i) => <tile.type {...tile.props} key={i} i={i} blur={i < 10} />)}
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
