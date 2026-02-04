import { styleframe } from "styleframe";

const s = styleframe();

// Simple variable
const colorPrimary = s.variable("color.primary", "#006cff");

// Simple selector
s.selector(".h1", {
	color: s.ref(colorPrimary),
});

// Named export for recipe - will be available from virtual:styleframe
export const h1 = s.recipe({
	name: "h1",
	base: {
		fontSize: "32px",
		fontWeight: "bold",
	},
});

export default s;
