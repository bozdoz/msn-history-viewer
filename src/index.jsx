import * as React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

window.addEventListener("hashchange", () => {
	const { hash } = window.location;

	if (hash) {
		window.gtag("event", "hash-change", { hash });
	}
});
