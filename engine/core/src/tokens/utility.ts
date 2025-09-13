import type {
	Container,
	Modifier,
	Root,
	TokenValue,
	Utility,
	UtilityCreatorFn,
} from "../types";
import type {
	DeclarationsCallback,
	DeclarationsCallbackContext,
} from "./declarations";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createUtilityFunction(_parent: Container, root: Root) {
	return function utility<Name extends string>(
		name: Name,
		factory: DeclarationsCallback<
			DeclarationsCallbackContext & {
				value: TokenValue;
			}
		>,
	): UtilityCreatorFn {
		return (
			entries: Record<string, TokenValue>,
			modifiers: Modifier[] = [],
		) => {
			Object.entries(entries).forEach(([key, value]) => {
				const instance: Utility<Name> = {
					type: "utility",
					name,
					value: key,
					declarations: {},
					variables: [],
					children: [],
					modifiers,
				};

				const callbackContext = createDeclarationsCallbackContext(
					instance,
					root,
				);

				instance.declarations =
					factory({
						...callbackContext,
						value,
					}) ?? {};

				parseDeclarationsBlock(instance.declarations, callbackContext);

				// Store the utility value on the instance
				root.utilities.push(instance);
			});
		};
	};
}
