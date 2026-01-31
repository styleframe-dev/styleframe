import { useBoxShadow, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	boxShadowNone,
	boxShadowXs,
	boxShadowSm,
	boxShadowMd,
	boxShadowLg,
	boxShadowXl,
	boxShadow2xl,
	boxShadowInner,
	boxShadowRing,
} = useBoxShadow(s);

// Register all utilities and generate utility classes
const { createBoxShadowUtility } = useUtilitiesPreset(s);

createBoxShadowUtility({
	none: s.ref(boxShadowNone),
	xs: s.ref(boxShadowXs),
	sm: s.ref(boxShadowSm),
	md: s.ref(boxShadowMd),
	lg: s.ref(boxShadowLg),
	xl: s.ref(boxShadowXl),
	"2xl": s.ref(boxShadow2xl),
	inner: s.ref(boxShadowInner),
	ring: s.ref(boxShadowRing),
});

export const boxShadowPreview = s.recipe({
	name: "box-shadow-preview",
	base: {},
	variants: {
		boxShadow: {
			none: {
				boxShadow: s.ref(boxShadowNone),
			},
			xs: {
				boxShadow: s.ref(boxShadowXs),
			},
			sm: {
				boxShadow: s.ref(boxShadowSm),
			},
			md: {
				boxShadow: s.ref(boxShadowMd),
			},
			lg: {
				boxShadow: s.ref(boxShadowLg),
			},
			xl: {
				boxShadow: s.ref(boxShadowXl),
			},
			"2xl": {
				boxShadow: s.ref(boxShadow2xl),
			},
			inner: {
				boxShadow: s.ref(boxShadowInner),
			},
			ring: {
				boxShadow: s.ref(boxShadowRing),
			},
		},
	},
	defaultVariants: {
		boxShadow: "md",
	},
});

export default s;
