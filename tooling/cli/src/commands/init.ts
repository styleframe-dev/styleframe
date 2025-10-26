import consola from "consola";
import { defineCommand } from "citty";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileExists } from "../utils";
import { initializeViteFrameworkFile } from "./init/vite";
import { initializeNuxtFrameworkFile } from "./init/nuxt";
import { DOCS_INSTALLATION_CUSTOM_URL } from "../constants";

const styleframeConfigTemplate = `import { styleframe } from "styleframe";

const s = styleframe();

s.variable("color--primary", "blue");

export default s;
`;

export async function initializeConfigFile(cwd: string) {
	const styleframeConfigPath = path.join(cwd, "styleframe.config.ts");

	if (await fileExists(styleframeConfigPath)) {
		consola.warn(
			`Skipped creating "styleframe.config.ts" because it already exists.`,
		);
	} else {
		await writeFile(styleframeConfigPath, styleframeConfigTemplate);
		consola.success(`Created "styleframe.config.ts".`);
	}
}

export async function addPackageJsonDependencies(cwd: string) {
	const packageJsonPath = path.join(cwd, "package.json");
	if (await fileExists(packageJsonPath)) {
		const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

		if (!packageJson.devDependencies) packageJson.devDependencies = {};
		packageJson.devDependencies["styleframe"] = "^1.0.0";
		packageJson.devDependencies["@styleframe/theme"] = "^1.0.0";

		await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

		consola.success(`Added dependencies to "package.json".`);
	} else {
		consola.warn(
			`Skipped adding styleframe to dependencies because package.json could not be found.`,
		);
	}
}

export async function initializeFrameworkFile(cwd: string) {
	if (await fileExists(path.join(cwd, "vite.config.ts"))) {
		await initializeViteFrameworkFile(cwd);
	} else if (await fileExists(path.join(cwd, "nuxt.config.ts"))) {
		await initializeNuxtFrameworkFile(cwd);
	} else {
		consola.warn(
			"No framework file detected. Read more about setting up styleframe manually.",
			DOCS_INSTALLATION_CUSTOM_URL,
		);
	}
}

export default defineCommand({
	meta: {
		name: "init",
		description: "Initialize a new styleframe project.",
	},
	args: {
		cwd: {
			type: "string",
			required: false,
			default: process.cwd(),
			description: "The directory where the project will be initialized",
			alias: ["d", "dir"],
			valueHint: "path",
		},
	},
	async run({ args }) {
		const { cwd } = args;

		consola.info("Initializing...");

		await initializeConfigFile(cwd);
		await addPackageJsonDependencies(cwd);
		await initializeFrameworkFile(cwd);
	},
});
