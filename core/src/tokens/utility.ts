import { isUtility } from "../typeGuards";
import type {
	Container,
	DeclarationsBlock,
	Root,
	TokenValue,
	Utility,
} from "../types";
import { createSelectorFunction } from "./selector";

export function createUtilityFunction(parent: Container, root: Root) {
	return function utility<Name extends string>(
		name: Name,
		declarations: (value: TokenValue) => DeclarationsBlock,
		values?: Record<string, TokenValue>,
	): ((values: Record<string, TokenValue>) => void) | Utility<Name> {
		const utilityInstance: Utility<Name> = {
			type: "utility",
			name,
			declarations,
		};

		root.utilities.push(utilityInstance);

		const selector = createSelectorFunction(parent, root);

		const createUtilitySelector = (entries: Record<string, TokenValue>) => {
			Object.entries(entries).forEach(([key, value]) => {
				const utilityName = value === true ? name : `${name}:${key}`;

				root.children.push(selector(`._${utilityName}`, declarations(value)));
			});
		};

		if (values) {
			createUtilitySelector(values);
		}

		return createUtilitySelector;
	};
}
