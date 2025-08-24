import type { Container, DeclarationsBlock, Media, Root } from "../types";
import type { DeclarationsCallback } from "./declarations";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createMediaFunction(parent: Container, root: Root) {
	return function media(
		query: string,
		declarationsOrCallback: DeclarationsBlock | DeclarationsCallback,
	): Media {
		const instance: Media = {
			type: "media",
			query: query.replace("@media ", ""),
			declarations: {},
			variables: [],
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		// Handle overloaded parameters
		if (typeof declarationsOrCallback === "function") {
			// media(query, callback)
			instance.declarations = declarationsOrCallback(callbackContext) ?? {};
		} else {
			// media(query, declarations)
			instance.declarations = declarationsOrCallback;
		}

		parseDeclarationsBlock(instance.declarations, callbackContext);

		parent.children.push(instance);

		return instance;
	};
}
