import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector, css } = s;

selector(".swatch-card", {
	display: "flex",
	flexDirection: "column",
	borderRadius: "@border-radius.lg",
	border: css`1px solid @border-color`,
	background: "@color.surface",
	overflow: "hidden",
});

selector(".swatch-card--horizontal", {
	flexDirection: "row",
});

selector(".swatch-card__body", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "@spacing",
});

selector(".swatch-card__preview", {
	width: "calc(@spacing * 6)",
	height: "calc(@spacing * 6)",
});

selector(".swatch-card__footer", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "@spacing.2xs",
	padding: "@spacing",
	borderTop: css`1px solid @border-color`,
	background: "@color.surface",
});

selector(".swatch-card--horizontal .swatch-card__footer", {
	justifyContent: "center",
	borderTop: 0,
	borderLeft: css`1px solid @border-color`,
});

selector(".swatch-card__label", {
	fontSize: "@font-size",
	fontWeight: "@font-weight",
	color: "@color.text-weakest",
	textAlign: "center",
});

export default s;
