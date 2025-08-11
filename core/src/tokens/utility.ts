import type {
	Container,
	DeclarationsBlock,
	Modifier,
	Root,
	TokenValue,
	Utility,
	UtilityCreatorFn,
} from "../types";
import { combineKeys } from "./modifier";
import { createSelectorFunction } from "./selector";

export function createUtilityFunction(parent: Container, root: Root) {
	return function utility<Name extends string>(
		name: Name,
		declarations: (value: TokenValue) => DeclarationsBlock,
	): UtilityCreatorFn {
		const utilityInstance: Utility<Name> = {
			type: "utility",
			name,
			declarations,
		};
		const selector = createSelectorFunction(parent, root);

		root.utilities.push(utilityInstance);

		return (
			entries: Record<string, TokenValue>,
			options?: {
				modifiers?: Modifier[];
			},
		) => {
			Object.entries(entries).forEach(([key, value]) => {
				const utilitySelectorPart =
					value === true || !value ? name : `${name}:${key}`;

				// Create the base utility selector
				selector(`._${utilitySelectorPart}`, declarations(value));

				if (options?.modifiers && options?.modifiers.length > 0) {
					const modifierKeys =
						options.modifiers.map((modifier) => modifier.key) ?? [];
					const modifierCombinations = combineKeys(modifierKeys);

					modifierCombinations.forEach((combination) => {
						const modifierSelectorPart = combination.join(":");
						const modifiedDeclarations = combination.reduce(
							(acc, modifierKey) => {
								const modifier = options?.modifiers?.find((modifier) =>
									modifier.key.includes(modifierKey),
								);

								return modifier
									? modifier.transform({
											key: modifierKey,
											declarations: acc,
										})
									: acc;
							},
							declarations(value),
						);

						selector(
							`._${modifierSelectorPart}:${utilitySelectorPart}`,
							modifiedDeclarations,
						);
					});
				}
			});
		};
	};
}
