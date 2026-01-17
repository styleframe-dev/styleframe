import { styleframe } from "styleframe";

const s = styleframe();

// Token Grid styles
s.selector(".token-grid", {
	padding: "16px",
});

s.selector(".token-grid--grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "24px",
});

s.selector(".token-grid--list", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

// Base Token Swatch styles
s.selector(".token-swatch", {
	display: "flex",
});

// Box layout (colors, borders, shadows)
s.selector(".token-swatch--box", {
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".token-swatch--box .token-swatch__preview", {
	width: "100px",
	height: "100px",
	borderRadius: "8px",
});

s.selector(".token-swatch--box .token-swatch__name", {
	fontSize: "14px",
	fontWeight: "500",
	color: "#374151",
});

// Row layout (spacing, sizing tokens)
s.selector(".token-swatch--row", {
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".token-swatch--row .token-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "40px",
});

s.selector(".token-swatch--row .token-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "60px",
});

// Text layout (typography)
s.selector(".token-swatch--text", {
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".token-swatch--text .token-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
});

s.selector(".token-swatch--text .token-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
});

s.selector(".token-swatch--text .token-swatch__preview", {
	color: "#374151",
});

// Color variant layout (shades, tints, lightness)
s.selector(".token-swatch--color-variant", {
	flexDirection: "column",
	alignItems: "center",
	gap: "4px",
});

s.selector(".token-swatch--color-variant .token-swatch__preview", {
	width: "80px",
	height: "60px",
	borderRadius: "8px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: "600",
	fontSize: "14px",
});

s.selector(".token-swatch--color-variant .token-swatch__label", {
	fontSize: "12px",
	color: "#64748b",
	textAlign: "center",
});

export default s;
