import { styleframe } from "styleframe";
import { colors as designTokenColors } from "../tokens.styleframe";

const s = styleframe();

export const colorPreview = s.recipe({
	name: "color-preview",
	base: {},
	variants: {
		color: {
			primary: {
				background: s.ref(designTokenColors.colorPrimary),
			},
			secondary: {
				background: s.ref(designTokenColors.colorSecondary),
			},
			info: {
				background: s.ref(designTokenColors.colorInfo),
			},
			success: {
				background: s.ref(designTokenColors.colorSuccess),
			},
			warning: {
				background: s.ref(designTokenColors.colorWarning),
			},
			danger: {
				background: s.ref(designTokenColors.colorDanger),
			},
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

export default s;
