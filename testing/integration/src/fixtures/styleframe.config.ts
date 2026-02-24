import { styleframe } from "styleframe";
import {
	createMultiplierAutogenerate,
	useBadgeRecipe,
	useDesignTokensPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";

const s = styleframe();

const tokens = useDesignTokensPreset(s);
const { colors, spacing, fontSize, fontWeight, borderRadius } = tokens;
const { colorPrimary, colorSecondary } = colors;

useUtilitiesPreset(s);

// ── Existing: Selector test ─────────────────────────────────────────────────
s.selector(".h1", {
	color: s.ref(colorPrimary),
	background: s.ref(colorSecondary),
});

// ── Variables test ──────────────────────────────────────────────────────────
const customSize = s.variable("custom.size", "48px");
const customFont = s.variable("custom.font", "monospace");

s.selector(".test-variables", {
	width: s.ref(customSize),
	fontFamily: s.ref(customFont),
});

s.selector(".test-ref-string", {
	padding: "@spacing.lg",
	fontSize: "@font-size.xl",
});

// ── Selectors advanced test ─────────────────────────────────────────────────
s.selector(".card", {
	padding: s.ref(spacing.spacingMd),
	borderRadius: s.ref(borderRadius.borderRadiusMd),
	"@media (min-width: 768px)": {
		padding: s.ref(spacing.spacingXl),
	},
});

s.selector(".card .card-title", {
	fontSize: s.ref(fontSize.fontSizeXl),
	fontWeight: s.ref(fontWeight.fontWeightBold),
});

// ── Themes test ─────────────────────────────────────────────────────────────
s.theme("dark", (ctx) => {
	ctx.variable(colorPrimary, "#60a5fa");
	ctx.variable(colorSecondary, "#9ca3af");
});

s.selector(".themed-box", {
	backgroundColor: s.ref(colorPrimary),
	color: s.ref(colorSecondary),
});

// ── Keyframes test ──────────────────────────────────────────────────────────
s.keyframes("fade-in", {
	"0%": { opacity: "0" },
	"100%": { opacity: "1" },
});

s.selector(".animate-fade-in", {
	animationName: "fade-in",
	animationDuration: "0.3s",
	animationFillMode: "forwards",
});

// ── Autogenerate test: custom utility with array syntax ─────────────────────
const createCustomSpacing = s.utility(
	"custom-spacing",
	({ value }) => ({
		padding: value,
	}),
	{
		autogenerate: createMultiplierAutogenerate({
			s,
			baseVariable: "spacing",
			fallback: "1rem",
			namespace: "spacing",
		}),
		namespace: "spacing",
	},
);

createCustomSpacing(["@sm", "@md", "@1.5", "auto"]);

// ── Recipe test ─────────────────────────────────────────────────────────────
export const badge = useBadgeRecipe(s);

export default s;
