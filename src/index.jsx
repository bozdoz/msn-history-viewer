import * as React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./components/App";

// adds Sentry for error tracking
Sentry.init({
	dsn:
		"https://1b8869eff143481592033b9e7f72b0be@o69899.ingest.sentry.io/5583213",
	autoSessionTracking: true,
	integrations: [new Integrations.BrowserTracing()],

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,
});

// Google Analytics for usage stats
window.addEventListener("hashchange", () => {
	const { hash } = window.location;

	if (hash) {
		window.gtag("event", "hash_change", { hash });
	}
});

// Render the app
ReactDOM.render(<App />, document.getElementById("root"));
