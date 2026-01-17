import { useBoxShadow } from "@styleframe/theme";
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

// Create box-shadow utility and generate utility classes
const createBoxShadow = s.utility("box-shadow", ({ value }) => ({
	boxShadow: value,
}));

createBoxShadow({
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
	base: {
		width: "120px",
		height: "80px",
		borderRadius: "8px",
		background: "#ffffff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "12px",
		color: "#64748b",
	},
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

s.selector(".box-shadow-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "12px",
});

s.selector(".box-shadow-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "32px",
	padding: "24px",
	background: "#f1f5f9",
	borderRadius: "8px",
});

export default s;
