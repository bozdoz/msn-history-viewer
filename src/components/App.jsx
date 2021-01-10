import * as React from "react";
import * as Sentry from "@sentry/react";
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

				// set data if we know we can parse it:
				const mainTag = (parsed && parsed.children[0]) || null;

				if (mainTag && mainTag.tagName === "Log") {
					setData(mainTag);

					if (location.hash) {
						// resets hash and causes scrollTo element
						// eslint-disable-next-line no-self-assign
						location.hash = location.hash;
					}
				} else {
					// eslint-disable-next-line no-console
					console.error("This file is unlikely to be parsed properly");
					setData(mainTag);

					Sentry.setExtras({
						mainTag,
					});
					Sentry.captureMessage("Unusual data");

					window.gtag("event", "unusual_data");
				}

				setIsLoading(false);
			}, 0);
		},
		[setIsLoading, setData]
	);

	React.useEffect(() => {
		if (!id) {
			return;
		}

		window.gtag("event", "query_id", { id });

		const path = `/private/${id}.xml`;
		setIsLoading(true);
		loadXML(path)
			.then(onXMLChange)
			.catch(() => {
				// path doesn't exist
				setIsLoading(false);

				window.gtag("event", "query_id_failed", { id });
			});
	}, [id, onXMLChange]);

	// TODO: failed state component
	// TODO: undo or go back to previous conversation? (would require storage I'm guessing)
	// TODO: Table of Contents (dates)
	return (
		<Sentry.ErrorBoundary showDialog>
			<DragAndDrop
				onChange={onXMLChange}
				isLoading={isLoading}
				onLoading={setIsLoading}
			>
				{data && <Conversation node={data} />}
			</DragAndDrop>
		</Sentry.ErrorBoundary>
	);
};

export default App;
