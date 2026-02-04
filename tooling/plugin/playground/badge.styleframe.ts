import { styleframe } from "virtual:styleframe";

const s = styleframe(); // Returns the shared instance from styleframe.config.ts

// Named export for selector
export const badgeSelector = s.selector(".badge", {
	background: "purple",
	color: "white",
	padding: "4px 8px",
});

// Named export for recipe - will be available from virtual:styleframe
export const badge = s.recipe({
	name: "badge",
	base: {
		display: "inline-block",
	},
	variants: {},
});

export default s;
