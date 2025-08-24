import type { ContainerChild, Styleframe } from "@styleframe/core";
import { consume } from "./consume";
import type { Output, OutputFile, OutputLine } from "./types";

export function createFile(
	name: string,
	content: OutputLine[] = [],
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
			[
				{
					code: `@import './default.css';`,
					level: 0,
				},
			],
			"theme",
		);
		themesIndexFile.content.push(
			...instance.root.themes.map((theme) => ({
				code: `@import './${theme.name}.css';`,
				level: 0,
			})),
		);
		output.files.push(themesIndexFile);
	}

	if (instance.root.children.length > 0 || instance.root.variables.length > 0) {
		const defaultThemeFile = createFile("theme/default.css", [], "component");

		if (instance.root.variables.length > 0) {
			defaultThemeFile.content.push({
				code: `:root {`,
				level: 0,
			});
			defaultThemeFile.content.push(...instance.root.variables.map(consume));
			defaultThemeFile.content.push({
				code: `}`,
				level: 0,
			});
		}

		defaultThemeFile.content.push(...instance.root.children.map(consume));

		output.files.push(defaultThemeFile);
	}

	for (const theme of instance.root.themes) {
		const currentThemeFile = createFile(
			`themes/${theme.name}.css`,
			[consume(theme)],
			"theme",
		);
		output.files.push(currentThemeFile);
	}
}
