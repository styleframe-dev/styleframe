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

s.recipe({
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

export default s;
