import { styleframe } from "virtual:styleframe";

const s = styleframe();

s.selector(".button", {
	background: "@color.primary",
	color: "white",
	padding: "10px 20px",
});

s.recipe({
	name: "simple-button",
	base: {
		borderWidth: "thin",
		borderStyle: "solid",
		borderColor: "blue",
	},
	variants: {},
});

export default s;
