import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

selector(".swatch-row", {
	display: "flex",
	alignItems: "center",
	gap: "@spacing",
	padding: "@spacing.sm @spacing",
	borderRadius: "@border-radius.lg",
	background: "@color.surface",
});

selector(".swatch-row__name", {
	fontWeight: "@font-weight.semibold",
	fontSize: "@font-size.lg",
	color: "@color.primary",
	minWidth: "calc(@spacing * 3)",
});

selector(".swatch-row__name--uppercase", {
	textTransform: "uppercase",
});

selector(".swatch-row__value", {
	fontSize: "@font-size.lg",
	color: "@color.secondary",
	fontFamily: "@font-family.mono",
	minWidth: "calc(@spacing * 4)",
});

selector(".swatch-row__content", {
	flex: "1",
	display: "flex",
	alignItems: "center",
});

export default s;
