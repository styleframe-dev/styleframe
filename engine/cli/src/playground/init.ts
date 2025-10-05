import { copyFile } from "node:fs/promises";
import path from "node:path";
import init from "../commands/init";

const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
	await copyFile(
		path.join(__dirname, "package.template.json"),
		path.join(__dirname, "package.json"),
	);

	// biome-ignore lint/suspicious/noExplicitAny: No need for explicit type
	await init.run?.({ args: { cwd: __dirname } } as any);
})();
