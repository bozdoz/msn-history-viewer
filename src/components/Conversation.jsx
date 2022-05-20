import React from "react";
import styled, { css } from "styled-components";
import formatDate from "../utils/formatDate";
import ColorPicker from "./ColorPicker";
import Header from "./Header";

const StyledConversation = styled.div`
	padding-top: 15vh;
	padding-bottom: 61.8vh;
	padding-left: 1em;
	padding-right: 1em;
	max-width: 600px;
	margin: 0 auto;
	text-align: left;

	*::selection {
		background: #ff0;
		color: black;
	}
`;

const Message = styled.div`
	margin-left: 1em;
	font-size: 14pt;
	line-height: 1.4em;
	${({ extraCSS }) =>
		extraCSS &&
		css`
			${extraCSS}
		`}
`;

const From = styled.a`
	display: block;
	margin-top: 0.4em;
	margin-bottom: 0.4em;
	color: #999;
	font-weight: lighter;
	font-family: sans-serif;
	text-decoration: none;
`;

const colorRegex = /color:(.*?);/g;

/**
 * Renders a conversation from an MSN history XML file
 */
const Conversation = ({ node }) => {
	const { children } = node;
	let lastFrom = null;
	let lastDate = null;

	// TODO: member names should be truncated because they are insane
	const members = Array.from(children[0].querySelectorAll("User")).map((user) =>
		user.getAttribute("FriendlyName")
	);

	return (
		<StyledConversation>
			{members.length > 0 && <Header Elem="h1">{members.join(" & ")}</Header>}
			{Array.from(children).map((child, i) => {
				const from = child.querySelector("User").getAttribute("FriendlyName");
				const style = child
					.querySelector("Text")
					.getAttribute("Style")
					.replace(colorRegex, "color:var(--message,$1);");
				const dateTime = new Date(child.getAttribute("DateTime"));
				const formattedDate = formatDate(dateTime);
				const date = child.getAttribute("Date");
				const dtString = dateTime.valueOf().toString();

				const newFrom = from !== lastFrom;
				const newDate = date !== lastDate;

				lastFrom = from;
				lastDate = date;

				return (
					<React.Fragment key={i}>
						{newDate && <Header id={dtString}>{formattedDate}</Header>}
						{newFrom && (
							<From id={dtString} href={`#${dtString}`} title={formattedDate}>
								{from} says:
							</From>
						)}
						<Message extraCSS={style} title={formattedDate}>
							{child.textContent}
						</Message>
					</React.Fragment>
				);
			})}
			<ColorPicker />
		</StyledConversation>
	);
};

export default Conversation;
