import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".badge", {
	background: "purple",
	color: "white",
	padding: "4px 8px",
});

s.recipe({
	name: "badge",
	base: {
		borderRadius: "9999px",
		fontSize: "12px",
		fontWeight: "500",
	},
	variants: {},
});

export default s;
