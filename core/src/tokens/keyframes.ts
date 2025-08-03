import type { Container, DeclarationsBlock, Keyframes, Root } from "../types";

export function createKeyframesFunction(parent: Container, root: Root) {
	return function keyframes(
		name: string,
		declarations: Record<string, DeclarationsBlock>,
	): Keyframes {
		const instance: Keyframes = {
			type: "keyframes",
			name,
			declarations,
		};

		parent.children.push(instance);

		return instance;
	};
}
