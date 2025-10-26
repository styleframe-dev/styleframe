import { loadConfiguration } from "../src/config";

const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
	const config = await loadConfiguration({ cwd: __dirname });

	console.log(JSON.stringify(config.root, null, 2));
})();
