import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".box-shadow-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".box-shadow-swatch__preview", {
	width: "100px",
	height: "100px",
});

s.selector(".box-shadow-swatch__name", {
	fontSize: "14px",
	fontWeight: "500",
	color: "#374151",
});

export default s;
