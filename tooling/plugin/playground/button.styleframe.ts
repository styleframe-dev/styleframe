import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".button", {
	background: "blue",
	color: "white",
	padding: "10px 20px",
});

s.recipe({
	name: "button",
	base: {
		borderWidth: "thin",
		borderStyle: "solid",
		borderColor: "blue",
	},
	variants: {},
});

export default s;
