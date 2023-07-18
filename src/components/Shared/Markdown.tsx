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
			p: ({node, ...props}) => <p style={{columnCount}} {...props} />
		}}
		className="sheet__body"
	>
		{children}
	</ReactMarkdown>
}


export default Markdown
