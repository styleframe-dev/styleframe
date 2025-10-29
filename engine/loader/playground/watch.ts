import { watchConfiguration } from "../src/config";

const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
	const config = await watchConfiguration({ cwd: __dirname });

	console.log(config);
})();
