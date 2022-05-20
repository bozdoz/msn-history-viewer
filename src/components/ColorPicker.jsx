import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.div`
	width: 1em;
	height: 1em;
	background: #000;
	border-radius: 50%;
	border: 0.25em solid #777;
	position: fixed;
	bottom: 50%;
	right: 1em;
	opacity: 0.2;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		opacity: 0.3;
	}

	&:active {
		opacity: 0.4;
	}
`;

// TODO: make a full color-picker
const ColorPicker = () => {
	const [textBlack, setTextBlack] = useState(false);
	const onClick = useCallback(() => {
		setTextBlack((x) => !x);
	}, []);

	useEffect(() => {
		/** @type {HTMLElement} */
		const root = document.querySelector(":root");

		if (textBlack) {
			root.style.setProperty("--message", "#333");
		} else {
			root.style.removeProperty("--message");
		}
	}, [textBlack]);

	return (
		<Button title="Toggle message font color to black" onClick={onClick} />
	);
};

export default ColorPicker;
