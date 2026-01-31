import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".scale-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".scale-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "120px",
});

s.selector(".scale-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "60px",
});

s.selector(".scale-swatch__bars", {
	display: "flex",
	alignItems: "flex-end",
	gap: "4px",
	height: "40px",
	marginLeft: "auto",
});

s.selector(".scale-swatch__bar", {
	width: "12px",
	borderRadius: "2px",
	background: "#1E3A8A",
});

export default s;
