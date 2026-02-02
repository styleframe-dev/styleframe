import { styleframe } from "virtual:styleframe";

const s = styleframe(); // Returns the shared instance from styleframe.config.ts

// Named export for selector - will be exported as the selector string
export const buttonSelector = s.selector(".button", {
	background: "blue",
	color: "white",
	padding: "10px 20px",
});

// Named export for recipe - will be exported with this exact name
export const buttonRecipe = s.recipe({
	name: "button",
	base: {
		display: "inline-block",
	},
	variants: {},
});

export default s;
