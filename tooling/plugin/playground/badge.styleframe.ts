import { styleframe } from "virtual:styleframe";

const s = styleframe();

s.selector(".badge", {
	background: "@color.primary",
	color: "white",
	padding: "4px 8px",
});

s.recipe({
	name: "simple-badge",
	base: {
		borderRadius: "9999px",
		fontSize: "12px",
		fontWeight: "500",
	},
	variants: {},
});

export default s;
