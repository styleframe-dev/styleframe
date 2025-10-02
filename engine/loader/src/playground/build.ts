import path from "path";
import { loadConfiguration } from "../config";
import { build } from "../build";

const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
	const config = await loadConfiguration({ cwd: __dirname });

	await build(config, {
		outputDir: path.resolve(__dirname, "dist"),
	});
})();
