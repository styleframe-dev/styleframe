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
		callback?: DeclarationsCallback,
	): Media {
		const instance: Media = {
			type: "media",
			query: query.replace("@media ", ""),
			declarations: {},
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		// Handle overloaded parameters
		if (typeof declarationsOrCallback === "function") {
			// media(query, callback)
			declarationsOrCallback(callbackContext);
		} else {
			// media(query, declarations, callback?)
			instance.declarations = declarationsOrCallback;
			parseDeclarationsBlock(declarationsOrCallback, callbackContext);

			if (callback) {
				callback(callbackContext);
			}
		}

		parent.children.push(instance);

		return instance;
	};
}
