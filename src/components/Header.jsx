import * as React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
	line-height: 1.4;

	& > * {
		padding: 0.4em 0;

		a {
			color: #667;
			text-decoration: none;
			font-weight: lighter;
			font-family: sans-serif;
		}
	}

	h1 {
		padding: 0.8em 0 1em;
		font-size: 1.6em;
		a {
			color: #abe;
		}
	}

	h2 {
		font-size: 1.2em;
		text-align: center;

		a {
			color: #889;
		}
	}
`;

const Level = ({ Elem = "h2", children, ...props }) => {
	return (
		<StyledHeader>
			<Elem {...props}>{children}</Elem>
		</StyledHeader>
	);
};

/**
 * Render a linkable header with optional Elem prop (h1, h2, h3, etc)
 */
const Header = ({ children, ...props }) => {
	const text = Array.isArray(children) ? children.join("") : children;
	const unique = text.replace(/[\W]+/g, "-");

	const content = props.Elem === "h1" ? text : `—${text}—`;

	return (
		<Level {...props} id={unique}>
			<a href={`#${unique}`}>{content}</a>
		</Level>
	);
};

export default Header;
