import { styleframe } from "styleframe";
import { boxShadow } from "../tokens.styleframe";

const s = styleframe();

export const boxShadowPreview = s.recipe({
	name: "box-shadow-preview",
	base: {},
	variants: {
		boxShadow: {
			none: {
				boxShadow: s.ref(boxShadow.boxShadowNone),
			},
			xs: {
				boxShadow: s.ref(boxShadow.boxShadowXs),
			},
			sm: {
				boxShadow: s.ref(boxShadow.boxShadowSm),
			},
			md: {
				boxShadow: s.ref(boxShadow.boxShadowMd),
			},
			lg: {
				boxShadow: s.ref(boxShadow.boxShadowLg),
			},
			xl: {
				boxShadow: s.ref(boxShadow.boxShadowXl),
			},
			"2xl": {
				boxShadow: s.ref(boxShadow.boxShadow2xl),
			},
			inner: {
				boxShadow: s.ref(boxShadow.boxShadowInner),
			},
			ring: {
				boxShadow: s.ref(boxShadow.boxShadowRing),
			},
		},
	},
	defaultVariants: {
		boxShadow: "md",
	},
});

export default s;
