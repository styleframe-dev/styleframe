import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".typography-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".typography-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
});

s.selector(".typography-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
});

s.selector(".typography-swatch__preview", {
	color: "#374151",
});

export default s;
