import type {
	Container,
	DeclarationsBlock,
	Modifier,
	Root,
	TokenValue,
	Utility,
	UtilityCreatorFn,
} from "../types";

export function createUtilityFunction(_parent: Container, root: Root) {
	return function utility<Name extends string>(
		name: Name,
		declarations: (value: TokenValue) => DeclarationsBlock,
	): UtilityCreatorFn {
		// Check if the utility with this name already exists
		let utilityInstance = root.utilities.find(
			(u): u is Utility<Name> => u.name === name,
		);

		// Create a new utility instance if it doesn't exist
		if (!utilityInstance) {
			utilityInstance = {
				type: "utility",
				name,
				declarations,
				values: {},
			};
			root.utilities.push(utilityInstance);
		}

		return (
			entries: Record<string, TokenValue>,
			modifiers: Modifier[] = [],
		) => {
			Object.entries(entries).forEach(([key, value]) => {
				// Store the utility value on the instance
				utilityInstance.values[key] = {
					value,
					modifiers,
				};
			});
		};
	};
}
