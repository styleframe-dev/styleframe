import { styleframe } from "styleframe";

const s = styleframe();

s.utility("borderWidth", ({ value }) => ({ borderWidth: value }));
s.utility("borderStyle", ({ value }) => ({ borderStyle: value }));
s.utility("borderColor", ({ value }) => ({ borderColor: value }));

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
		borderWidth: "thin",
		borderStyle: "solid",
		borderColor: "blue",
	},
	variants: {},
});

export default s;
