import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

selector(".progress-bar", {
	flex: "1",
	height: "@spacing.xs",
	background: "@border-color",
	borderRadius: "@border-radius",
	overflow: "hidden",
});

selector(".progress-bar__fill", {
	height: "100%",
	borderRadius: "@border-radius",
	background: "@color.primary",
	transition: "width 0.3s ease",
});

export default s;
