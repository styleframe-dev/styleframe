import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".border-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".border-swatch__preview", {
	width: "100px",
	height: "100px",
});

s.selector(".border-swatch__name", {
	fontSize: "14px",
	fontWeight: "500",
	color: "#374151",
});

export default s;
