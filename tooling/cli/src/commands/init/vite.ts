import consola from "consola";
import path from "path";
import {
	loadFile as loadMagicastFile,
	writeFile as writeMagicastFile,
} from "magicast";
import { addVitePlugin } from "magicast/helpers";

export async function initializeViteFrameworkFile(cwd: string) {
	consola.success("Vite environment detected.");
	const configFilePath = path.join(cwd, "vite.config.ts");

	try {
		const mod = await loadMagicastFile(configFilePath);

		addVitePlugin(mod, {
			from: "styleframe/plugins/vite",
			constructor: "styleframePlugin",
			imported: "default",
		});

		await writeMagicastFile(mod, configFilePath);

		consola.success(`Updated Vite config file.`);
	} catch (error) {
		consola.error(`Failed to update Vite config file.`);
		consola.log(error);
		console.log("");
		consola.log(
			"Please add `import styleframePlugin from 'styleframe/vite';` and register it manually.",
		);
	}
}
