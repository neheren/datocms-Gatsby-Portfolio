import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import styled from "styled-components";


const SocialImage = styled.img`
	width: 24px;
	height: 24px;
	margin: 0 8px;
`;


const FooterRoot = styled.div<{enableBg?: boolean, enableBorder?: boolean}>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	padding-top: 3px;
	border-top: ${props => props.enableBorder ? '1px solid #565656' : 'none'};
	background-color: ${props => props.enableBg ? '#fff' : 'none'};
	z-index: 10;
	background: white;
	position: relative;
`



interface SocialProfileData {
	allDatoCmsSocialProfile: {
		nodes: {
			id: string;
			logo: {
				url: string;
			};
			profileType: string;
			url: string;
		}[];
	};
}


type Props = {
	enableBg?: boolean;
	enableBorder?: boolean;
}
const Footer: React.FC = (props: Props) => {

	const {
		enableBg = false,
		enableBorder = true,
	} = props;

	const data = useStaticQuery<SocialProfileData>(graphql`
  query Socials {
    allDatoCmsSocialProfile(sort: { fields: position, order: ASC }) {
      nodes {
        id
        logo {
          url
        }
        profileType
        url
      }
    }
  }
`);


	// render your footer here
	return (
		<footer>
			<FooterRoot
				enableBg={enableBg}
				enableBorder={enableBorder}
			>

				{/*todo: isolate social icons*/}
				{data.allDatoCmsSocialProfile.nodes.map((profile) => (
					<a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer">
						<SocialImage src={profile.logo.url} alt={profile.profileType} />
					</a>
				))}
			</FooterRoot>
		</footer>
	);
};

export default Footer;
