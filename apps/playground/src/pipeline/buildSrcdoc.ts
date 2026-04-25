export interface BuildSrcdocInput {
	css: string;
	configCode: string;
	appCode: string;
	componentCode: string;
	vueUrl: string;
	runtimeUrl: string;
}

function makeBlobUrl(code: string): string {
	return URL.createObjectURL(
		new Blob([code], { type: "application/javascript" }),
	);
}

const configSpecifierRe = /from\s*["']\.\/styleframe\.config(?:\.ts)?["']/g;
const componentSpecifierRe = /from\s*["']\.\/Component\.vue["']/g;

export interface BuildSrcdocResult {
	srcdoc: string;
	revoke: () => void;
}

export function buildSrcdoc(input: BuildSrcdocInput): BuildSrcdocResult {
	const { css, configCode, appCode, componentCode, vueUrl, runtimeUrl } = input;

	const configUrl = makeBlobUrl(configCode);

	const componentCodeRewritten = componentCode.replace(
		configSpecifierRe,
		`from ${JSON.stringify(configUrl)}`,
	);
	const componentUrl = makeBlobUrl(componentCodeRewritten);

	const appCodeRewritten = appCode
		.replace(componentSpecifierRe, `from ${JSON.stringify(componentUrl)}`)
		.replace(configSpecifierRe, `from ${JSON.stringify(configUrl)}`);
	const appUrl = makeBlobUrl(appCodeRewritten);

	const bootScript = `
import { createApp } from "vue";
import App from ${JSON.stringify(appUrl)};
const notify = (type, detail) => parent.postMessage({ type: "pg:error", detail }, "*");
window.addEventListener("error", (event) => {
  notify("error", { message: event.message, stack: event.error && event.error.stack });
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  notify("error", {
    message: reason && reason.message ? reason.message : String(reason),
    stack: reason && reason.stack,
  });
});
try {
  createApp(App).mount("#app");
} catch (error) {
  notify("error", { message: error && error.message ? error.message : String(error), stack: error && error.stack });
}
`;

	const bootUrl = makeBlobUrl(bootScript);

	const srcdoc = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<script type="importmap">
{
  "imports": {
    "vue": ${JSON.stringify(vueUrl)},
    "@styleframe/runtime": ${JSON.stringify(runtimeUrl)}
  }
}
</script>
<style>
  html, body { margin: 0; padding: 0; height: 100%; }
  #app { min-height: 100%; }
</style>
<style id="pg-user-styles">${css}</style>
</head>
<body>
<div id="app"></div>
<script type="module" src=${JSON.stringify(bootUrl)}></script>
</body>
</html>`;

	const revoke = () => {
		URL.revokeObjectURL(configUrl);
		URL.revokeObjectURL(componentUrl);
		URL.revokeObjectURL(appUrl);
		URL.revokeObjectURL(bootUrl);
	};

	return { srcdoc, revoke };
}
