import { useColor } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	colorPrimary,
	colorSecondary,
	colorInfo,
	colorSuccess,
	colorWarning,
	colorDanger,
} = useColor(s, {
	primary: "#1E3A8A",
	secondary: "#9333EA",
	info: "#3B82F6",
	success: "#10B981",
	warning: "#F59E0B",
	danger: "#EF4444",
} as const);

s.utility("width", ({ value }) => ({
	width: value,
}));

s.utility("height", ({ value }) => ({
	height: value,
}));

s.utility("border-radius", ({ value }) => ({
	borderRadius: value,
}));

s.utility("background", ({ value }) => ({
	background: value,
}));

s.utility("display", ({ value }) => ({
	display: value,
}));

s.utility("flex-direction", ({ value }) => ({
	flexDirection: value,
}));

s.utility("align-items", ({ value }) => ({
	alignItems: value,
}));

s.utility("gap", ({ value }) => ({
	gap: value,
}));

s.utility("font-size", ({ value }) => ({
	fontSize: value,
}));

s.utility("font-weight", ({ value }) => ({
	fontWeight: value,
}));

s.utility("flex-wrap", ({ value }) => ({
	flexWrap: value,
}));

s.utility("padding", ({ value }) => ({
	padding: value,
}));

export const colorPreview = s.recipe({
	name: "color-preview",
	base: {
		width: "100px",
		height: "100px",
		borderRadius: "8px",
	},
	variants: {
		color: {
			primary: {
				background: s.ref(colorPrimary),
			},
			secondary: {
				background: s.ref(colorSecondary),
			},
			info: {
				background: s.ref(colorInfo),
			},
			success: {
				background: s.ref(colorSuccess),
			},
			warning: {
				background: s.ref(colorWarning),
			},
			danger: {
				background: s.ref(colorDanger),
			},
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

s.selector(".color-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".color-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "24px",
	padding: "16px",
});

export default s;
