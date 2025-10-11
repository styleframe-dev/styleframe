import type { Styleframe } from "../styleframe";
import { isRoot } from "../typeGuards";
import type { Container, Theme, Variable } from "../types";

export function mergeVariablesArray(a: Variable[], b: Variable[]) {
	const variables = [...a];
	for (const newVariable of b) {
		const existingVariable = variables.find(
			(variable) => variable.name === newVariable.name,
		);

		if (existingVariable) {
			existingVariable.value = newVariable.value;
		} else {
			variables.push(newVariable);
		}
	}

	return variables;
}

export function mergeThemesArray(a: Theme[], b: Theme[]) {
	const themes = [...a];
	for (const themeToBeAdded of b) {
		const existingTheme = themes.find(
			(theme) => theme.name === themeToBeAdded.name,
		);

		if (existingTheme) {
			Object.assign(
				existingTheme,
				mergeContainers(existingTheme, themeToBeAdded),
			);
		} else {
			themes.push(themeToBeAdded);
		}
	}

	return themes;
}

export function mergeContainers<T extends Container>(a: T, b: T) {
	return Object.keys(a).reduce<T>(
		(acc, key) => {
			if (key === "variables") {
				acc.variables = mergeVariablesArray(a.variables, b.variables);
			} else if (key === "declarations") {
				acc.declarations = { ...a.declarations, ...b.declarations };
			} else if (key === "themes" && isRoot(acc) && isRoot(a) && isRoot(b)) {
				acc.themes = mergeThemesArray(a.themes, b.themes);
			} else if (Array.isArray(a[key as keyof T])) {
				acc[key as keyof T] = (a[key as keyof T] as unknown[]).concat(
					b[key as keyof T],
				) as T[keyof T];
			}

			return acc;
		},
		{
			...a,
			...b,
		},
	);
}

export function merge(base: Styleframe, ...instances: Styleframe[]) {
	return instances.reduce((prev, curr) => {
		return {
			...prev,
			root: mergeContainers(prev.root, curr.root),
		};
	}, base);
}
