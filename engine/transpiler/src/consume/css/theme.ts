import type { StyleframeOptions, Theme } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";
import { createContainerConsumer } from "./container";
import { defaultThemeSelectorFn } from "../../defaults";

export function createThemeConsumer(consume: ConsumeFunction) {
	const consumeContainer = createContainerConsumer(consume);

	return function consumeTheme(instance: Theme, options: StyleframeOptions) {
		const selectorFn = options.theme?.selector ?? defaultThemeSelectorFn;
		const query = selectorFn({ name: instance.name });

		return consumeContainer(query, instance, options);
	};
}
