/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// biome-ignore lint/complexity/noBannedTypes: Vue SFC type declaration
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
