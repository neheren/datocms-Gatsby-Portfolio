import * as React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

type Props = {
	children: string,
	columnCount?: number,
}


const Markdown = ({children, columnCount = 1}: Props) => {

	return <ReactMarkdown
		components={{
			p: ({node, ...props}) => <p style={{columnCount}} {...props} />,
			em: ({node, ...props}) => <em {...props} style={{fontStyle: 'italic'}} />,
			b: ({node, ...props}) => <b {...props} style={{fontWeight: 600}} />,
			strong: ({node, ...props}) => <strong {...props} style={{fontWeight: 600}} />,

			// Open links in new tab
			a: ({node, ...props}) => <a  {...props} style={{color: '#000000'}} target="_blank" rel="noopener noreferrer" />,
		}}
		className="sheet__body"
	>
		{children}
	</ReactMarkdown>
}


export default Markdown
