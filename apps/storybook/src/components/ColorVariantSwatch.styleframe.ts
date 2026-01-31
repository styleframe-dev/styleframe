import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".color-variant-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "4px",
});

s.selector(".color-variant-swatch__preview", {
	width: "80px",
	height: "60px",
	borderRadius: "8px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: "600",
	fontSize: "14px",
});

s.selector(".color-variant-swatch__label", {
	fontSize: "12px",
	color: "#64748b",
	textAlign: "center",
});

export default s;
