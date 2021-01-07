import * as React from "react";
import styled, { css } from "styled-components";

const DropZone = styled.div`
	min-height: 100%;
	width: 100%;
	transition: background 0.3s;

	${({ noChildren }) =>
		noChildren &&
		css`
			font-size: 28pt;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			background: #69f;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		`}

	${({ isDragOver }) =>
		isDragOver &&
		css`
			background: #f69;
		`}

	${({ isLoading }) =>
		isLoading &&
		css`
			background: #96f;
		`}
`;

/**
 * Drag and drop for msn history xml files
 */
const DragAndDrop = ({
	children,
	onChange = () => {},
	isLoading,
	onLoading = () => {},
}) => {
	const [isDragOver, setDragOver] = React.useState(false);
	const onDragOver = React.useCallback(
		(e) => {
			e.preventDefault();
			setDragOver(true);
		},
		[setDragOver]
	);
	const onDragFalse = React.useCallback(
		(e) => {
			e.preventDefault();
			setDragOver(false);
		},
		[setDragOver]
	);
	const onDrop = React.useCallback(
		(e) => {
			onDragFalse(e);
			onLoading(true);

			const dt = e.dataTransfer;
			const files = dt.files;

			let file = Array.from(files).find(({ type }) => type === "text/xml");

			if (file) {
				const reader = new FileReader();

				reader.readAsText(file);

				window.gtag("event", "file-drop");

				reader.onload = function () {
					location.hash = "";
					onChange(reader.result);
					onLoading(false);
				};

				reader.onerror = function () {
					// eslint-disable-next-line no-console
					console.error(reader.error);
					// TODO: add sentry?
					window.gtag("event", "file-drop-fail", { file });
					onLoading(false);
				};
			} else {
				onLoading(false);
			}
		},
		[onDragFalse, onLoading, onChange]
	);

	let content = children;

	if (!children) {
		if (isLoading) {
			content = "Loading...";
		} else {
			content = "Drop Archive File Here";
		}
	}

	return (
		<DropZone
			noChildren={!children}
			isLoading={isLoading}
			isDragOver={isDragOver}
			onDragOver={onDragOver}
			onDragEnd={onDragFalse}
			onDragExit={onDragFalse}
			onDrop={onDrop}
		>
			{content}
		</DropZone>
	);
};

export default DragAndDrop;
