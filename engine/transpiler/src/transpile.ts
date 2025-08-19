import type { ContainerChild, Styleframe, Variable } from "@styleframe/core";
import { isVariable } from "@styleframe/core";
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

	if (instance.root.themes.length > 0 || instance.root.children.length > 0) {
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

	if (instance.root.children.length > 0) {
		const defaultThemeFile = createFile("theme/default.css", [], "component");
		const categorized = instance.root.children.reduce<{
			variables: Variable[];
			other: ContainerChild[];
		}>(
			(acc, child) => {
				if (isVariable(child)) {
					acc.variables.push(child);
				} else {
					acc.other.push(child);
				}

				return acc;
			},
			{
				variables: [],
				other: [],
			},
		);

		if (categorized.variables.length > 0) {
			defaultThemeFile.content.push(":root {");
			defaultThemeFile.content.push(...categorized.variables.map(consume));
			defaultThemeFile.content.push("}");
		}
		defaultThemeFile.content.push(...categorized.other.map(consume));

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
