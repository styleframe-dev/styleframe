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

export const colors = [
	"primary",
	"secondary",
	"info",
	"success",
	"warning",
	"danger",
] as const;

export type Color = (typeof colors)[number];

s.selector(".color-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".color-swatch__preview", {
	width: "100px",
	height: "100px",
	borderRadius: "8px",
});

s.selector(".color-swatch__name", {
	fontSize: "14px",
	fontWeight: "500",
	color: "#374151",
});

export const colorPreview = s.recipe({
	name: "color-preview",
	base: {},
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
