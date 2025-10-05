import type { Root, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { createContainerConsumer } from "./container";

export function createRootConsumer(consume: ConsumeFunction) {
	const consumeContainer = createContainerConsumer(consume);

	return function consumeRoot(instance: Root, options: StyleframeOptions) {
		return instance.themes
			.reduce(
				(acc, theme) => {
					acc.push(consume(theme, options));
					return acc;
				},
				[consumeContainer(":root", instance, options)], // Default theme (root)
			)
			.join("\n\n");
	};
}
