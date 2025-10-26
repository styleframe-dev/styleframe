import consola from "consola";
import path from "path";
import {
	loadFile as loadMagicastFile,
	writeFile as writeMagicastFile,
} from "magicast";
import { addNuxtModule } from "magicast/helpers";

export async function initializeNuxtFrameworkFile(cwd: string) {
	consola.success("Nuxt environment detected.");
	const configFilePath = path.join(cwd, "nuxt.config.ts");

	try {
		const mod = await loadMagicastFile(configFilePath);

		addNuxtModule(mod, "styleframe/nuxt", "styleframe");

		await writeMagicastFile(mod, configFilePath);

		consola.success(`Updated Nuxt config file.`);
	} catch (error) {
		consola.error(`Failed to update Nuxt config file: ${error}`);
		consola.error(
			"Please add `'styleframe/nuxt'` to your nuxt modules array manually.",
		);
	}
}
