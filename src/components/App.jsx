import * as React from "react";
import { parseXML, loadXML } from "../utils/loadXML";
import Conversation from "./Conversation";
import DragAndDrop from "./DragAndDrop";
import getQueryString from "../utils/getQueryString";

/**
 * Main app logic (mostly)
 */
const App = () => {
	// TODO save to/configure local storage
	const { id } = getQueryString();
	const [isLoading, setIsLoading] = React.useState(false);
	const [data, setData] = React.useState(null);
	const onXMLChange = React.useCallback(
		(xml) => {
			setIsLoading(true);

			setTimeout(() => {
				const parsed = parseXML(xml);
				setData(parsed);
				setIsLoading(false);

				if (location.hash) {
					// resets hash and causes scrollTo element
					// eslint-disable-next-line no-self-assign
					location.hash = location.hash;
				}
			}, 0);
		},
		[setIsLoading, setData]
	);

	React.useEffect(() => {
		if (!id) {
			return;
		}

		const path = `/private/${id}.xml`;
		setIsLoading(true);
		loadXML(path)
			.then(onXMLChange)
			.catch(() => {
				// path doesn't exist
				setIsLoading(false);
			});
	}, [id, onXMLChange]);

	const log = data && data.children[0];

	// TODO: failed state/undo
	return (
		<DragAndDrop
			onChange={onXMLChange}
			isLoading={isLoading}
			onLoading={setIsLoading}
		>
			{log && log.tagName === "Log" && <Conversation node={log} />}
		</DragAndDrop>
	);
};

export default App;
