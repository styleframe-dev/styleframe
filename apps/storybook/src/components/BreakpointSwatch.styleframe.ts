import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".breakpoint-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".breakpoint-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "40px",
	textTransform: "uppercase",
});

s.selector(".breakpoint-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "60px",
});

s.selector(".breakpoint-swatch__bar-container", {
	flex: "1",
	height: "8px",
	background: "#e2e8f0",
	borderRadius: "4px",
	overflow: "hidden",
});

s.selector(".breakpoint-swatch__bar", {
	height: "100%",
	borderRadius: "4px",
	background: "#1E3A8A",
	transition: "width 0.3s ease",
});

export default s;
