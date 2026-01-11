import { styleframe } from "styleframe";

const s = styleframe();

s.utility("borderRadius", ({ value }) => ({ borderRadius: value }));
s.utility("fontSize", ({ value }) => ({ fontSize: value }));
s.utility("fontWeight", ({ value }) => ({ fontWeight: value }));

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
