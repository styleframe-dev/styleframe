import { watchConfiguration } from "../src/config";

const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
	const { config, configFile, unwatch } = await watchConfiguration({
		cwd: __dirname,
		onUpdate: (newConfig) => {
			console.log("Config updated:", JSON.stringify(newConfig.root, null, 2));
		},
		onError: (error) => {
			console.error("Config error:", error.message);
		},
	});

	console.log("Watching:", configFile);
	console.log("Initial config:", JSON.stringify(config.root, null, 2));

	// Keep the process running
	process.on("SIGINT", async () => {
		await unwatch();
		process.exit(0);
	});
})();
