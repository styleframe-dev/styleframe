import { styleframe } from "styleframe";

const s = styleframe();

s.selector(".story-grid", {
	padding: "16px",
});

s.selector(".story-grid--grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "24px",
});

s.selector(".story-grid--list", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export default s;
