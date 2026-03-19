import { styleframe } from "virtual:styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { borderColor } = useDesignTokensPreset(s);
const { borderColor: borderColorDefault, borderColorPrimary } = borderColor;

selector(".border-color-swatch__preview", {
	width: "calc(@spacing * 6)",
	height: "calc(@spacing * 6)",
	background: "@color.surface",
	borderWidth: "2px",
	borderStyle: "solid",
});

export const borderColorSwatch = recipe({
	name: "border-color-swatch",
	base: {},
	variants: {
		variant: {
			default: {
				borderColor: ref(borderColorDefault),
			},
			primary: {
				borderColor: ref(borderColorPrimary),
			},
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export default s;
