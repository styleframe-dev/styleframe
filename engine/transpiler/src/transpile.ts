import type { Styleframe } from "@styleframe/core";
import { consume } from "./consume";
import type { Output, OutputFile } from "./types";

export function createFile(
	name: string,
	content: string[] = [],
	layer?: string,
): OutputFile {
	return {
		name,
		content,
		layer,
	};
}

export function transpile(instance: Styleframe, output: Output) {
	const options = instance.options;
	const indexFile = createFile("index.css", []);

	output.files.push(indexFile);

	if (
		instance.root.themes.length > 0 ||
		instance.root.children.length > 0 ||
		instance.root.variables.length > 0
	) {
		const themesIndexFile = createFile(
			"themes/index.css",
			[`@import './default.css';`],
			"theme",
		);
		themesIndexFile.content.push(
			...instance.root.themes.map((theme) => `@import './${theme.name}.css';`),
		);
		output.files.push(themesIndexFile);
	}

	if (instance.root.children.length > 0 || instance.root.variables.length > 0) {
		const defaultThemeFile = createFile("theme/default.css", [], "component");

		// @TODO Add default theme consumer
		defaultThemeFile.content.push(consume(instance.root, options));

		output.files.push(defaultThemeFile);
	}

	for (const theme of instance.root.themes) {
		const currentThemeFile = createFile(
			`themes/${theme.name}.css`,
			[consume(theme, options)],
			"theme",
		);
		output.files.push(currentThemeFile);
	}
}
