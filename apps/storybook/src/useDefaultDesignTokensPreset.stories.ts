import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./components/swatch.styleframe?css";
import "./useDefaultDesignTokensPreset.styleframe?css";
import {
	colorPreview,
	spacingPreview,
	borderWidthPreview,
	borderRadiusPreview,
	boxShadowPreview,
	fontFamilyPreview,
	fontSizePreview,
	fontWeightPreview,
	lineHeightPreview,
	easingPreview,
	colorTokens,
	spacingTokens,
	borderWidthTokens,
	borderRadiusTokens,
	boxShadowTokens,
	fontFamilyTokens,
	fontSizeTokens,
	fontWeightTokens,
	lineHeightTokens,
	easingTokens,
	tokenValues,
} from "./useDefaultDesignTokensPreset.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

// Color swatches
const ColorSwatch = createSwatchComponent(
	"PresetColorSwatch",
	"color",
	(color) => colorPreview({ color }),
	{
		layout: "box",
		values: tokenValues.colors,
	},
);

const ColorGrid = createGridComponent(
	"PresetColorGrid",
	[...colorTokens],
	ColorSwatch,
	"color",
	"grid",
);

// Spacing swatches
const SpacingSwatch = createSwatchComponent(
	"PresetSpacingSwatch",
	"spacing",
	(spacing) => spacingPreview({ spacing }),
	{
		layout: "row",
		values: tokenValues.spacing,
	},
);

const SpacingGrid = createGridComponent(
	"PresetSpacingGrid",
	[...spacingTokens],
	SpacingSwatch,
	"spacing",
	"list",
);

// Border width swatches
const BorderWidthSwatch = createSwatchComponent(
	"PresetBorderWidthSwatch",
	"borderWidth",
	(borderWidth) => borderWidthPreview({ borderWidth }),
	{
		layout: "box",
		values: tokenValues.borderWidth,
	},
);

const BorderWidthGrid = createGridComponent(
	"PresetBorderWidthGrid",
	[...borderWidthTokens],
	BorderWidthSwatch,
	"borderWidth",
	"grid",
);

// Border radius swatches
const BorderRadiusSwatch = createSwatchComponent(
	"PresetBorderRadiusSwatch",
	"borderRadius",
	(borderRadius) => borderRadiusPreview({ borderRadius }),
	{
		layout: "box",
		values: tokenValues.borderRadius,
	},
);

const BorderRadiusGrid = createGridComponent(
	"PresetBorderRadiusGrid",
	[...borderRadiusTokens],
	BorderRadiusSwatch,
	"borderRadius",
	"grid",
);

// Box shadow swatches
const BoxShadowSwatch = createSwatchComponent(
	"PresetBoxShadowSwatch",
	"boxShadow",
	(boxShadow) => boxShadowPreview({ boxShadow }),
	{
		layout: "box",
	},
);

const BoxShadowGrid = createGridComponent(
	"PresetBoxShadowGrid",
	[...boxShadowTokens],
	BoxShadowSwatch,
	"boxShadow",
	"grid",
);

// Font family swatches
const FontFamilySwatch = createSwatchComponent(
	"PresetFontFamilySwatch",
	"fontFamily",
	(fontFamily) => fontFamilyPreview({ fontFamily }),
	{
		layout: "text",
		sampleText: "The quick brown fox jumps over the lazy dog",
		values: tokenValues.fontFamily,
	},
);

const FontFamilyGrid = createGridComponent(
	"PresetFontFamilyGrid",
	[...fontFamilyTokens],
	FontFamilySwatch,
	"fontFamily",
	"list",
);

// Font size swatches
const FontSizeSwatch = createSwatchComponent(
	"PresetFontSizeSwatch",
	"fontSize",
	(fontSize) => fontSizePreview({ fontSize }),
	{
		layout: "text",
		sampleText: "Aa",
		values: tokenValues.fontSize,
	},
);

const FontSizeGrid = createGridComponent(
	"PresetFontSizeGrid",
	[...fontSizeTokens],
	FontSizeSwatch,
	"fontSize",
	"list",
);

// Font weight swatches
const FontWeightSwatch = createSwatchComponent(
	"PresetFontWeightSwatch",
	"fontWeight",
	(fontWeight) => fontWeightPreview({ fontWeight }),
	{
		layout: "text",
		sampleText: "The quick brown fox",
		values: tokenValues.fontWeight,
	},
);

const FontWeightGrid = createGridComponent(
	"PresetFontWeightGrid",
	[...fontWeightTokens],
	FontWeightSwatch,
	"fontWeight",
	"list",
);

// Line height swatches
const LineHeightSwatch = createSwatchComponent(
	"PresetLineHeightSwatch",
	"lineHeight",
	(lineHeight) => lineHeightPreview({ lineHeight }),
	{
		layout: "text",
		sampleText:
			"This is a sample paragraph demonstrating line height. Multiple lines help visualize the spacing between lines of text.",
		values: tokenValues.lineHeight,
	},
);

const LineHeightGrid = createGridComponent(
	"PresetLineHeightGrid",
	[...lineHeightTokens],
	LineHeightSwatch,
	"lineHeight",
	"list",
);

// Easing swatches (with hover animation)
const EasingSwatch = createSwatchComponent(
	"PresetEasingSwatch",
	"easing",
	(easing) => easingPreview({ easing }),
	{
		layout: "row",
		values: tokenValues.easing,
	},
);

const EasingGrid = createGridComponent(
	"PresetEasingGrid",
	[...easingTokens],
	EasingSwatch,
	"easing",
	"list",
);

// Overview component showing all token categories
const PresetOverview = defineComponent({
	name: "PresetOverview",
	setup() {
		return () =>
			h("div", { class: "preset-overview" }, [
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Colors"),
					h("p", { class: "preset-section__description" }, [
						"Semantic color tokens with automatic lightness, shade, and tint variants.",
					]),
					h(ColorGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Spacing"),
					h("p", { class: "preset-section__description" }, [
						"Consistent spacing scale for margins, padding, and gaps.",
					]),
					h(SpacingGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Border Width"),
					h("p", { class: "preset-section__description" }, [
						"Border width tokens using CSS keyword values.",
					]),
					h(BorderWidthGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Border Radius"),
					h("p", { class: "preset-section__description" }, [
						"Border radius tokens from sharp corners to fully rounded.",
					]),
					h(BorderRadiusGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Box Shadow"),
					h("p", { class: "preset-section__description" }, [
						"Elevation system using box shadows.",
					]),
					h(BoxShadowGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Font Family"),
					h("p", { class: "preset-section__description" }, [
						"System font stacks for different contexts.",
					]),
					h(FontFamilyGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Font Size"),
					h("p", { class: "preset-section__description" }, [
						"Type scale from small captions to large headings.",
					]),
					h(FontSizeGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Font Weight"),
					h("p", { class: "preset-section__description" }, [
						"Full range of font weights from thin to black.",
					]),
					h(FontWeightGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Line Height"),
					h("p", { class: "preset-section__description" }, [
						"Line height values for different text densities.",
					]),
					h(LineHeightGrid),
				]),
				h("section", { class: "preset-section" }, [
					h("h2", { class: "preset-section__title" }, "Easing"),
					h("p", { class: "preset-section__description" }, [
						"Animation timing functions. Hover over the boxes to see the easing in action.",
					]),
					h(EasingGrid),
				]),
			]);
	},
});

const meta = {
	title: "Theme/Presets/useDefaultDesignTokensPreset",
	component: PresetOverview,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
The \`useDefaultDesignTokensPreset\` composable creates a complete design token system with sensible defaults.
It includes tokens for colors, spacing, borders, typography, shadows, and animations.

## Usage

\`\`\`typescript
import { styleframe } from "styleframe";
import { useDefaultDesignTokensPreset } from "@styleframe/theme";

const s = styleframe();

// Use all defaults
const tokens = useDefaultDesignTokensPreset(s);

// Or customize specific domains
const tokens = useDefaultDesignTokensPreset(s, {
  colors: { primary: "#ff6600", secondary: "#333" },
  spacing: { sm: "0.25rem", md: "0.5rem", lg: "1rem" },
  easing: false, // Disable easing tokens
});

// Merge custom values with defaults
const tokens = useDefaultDesignTokensPreset(s, {
  meta: { merge: true },
  spacing: { xl: "2rem" }, // Added to default spacing
});
\`\`\`

## Token Categories

- **Colors**: Semantic colors with automatic lightness, shade, and tint variations
- **Spacing**: Consistent scale for padding, margin, and gap
- **Border Width/Radius/Style**: Border tokens
- **Box Shadow**: Elevation system
- **Typography**: Font family, size, weight, style, line height, letter spacing
- **Scale**: Modular scale ratios and powers
- **Breakpoints**: Responsive breakpoints
- **Easing**: Animation timing functions
`,
			},
		},
	},
} satisfies Meta<typeof PresetOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
	render: () => ({
		components: { PresetOverview },
		template: "<PresetOverview />",
	}),
};

export const Colors: StoryObj = {
	render: () => ({
		components: { ColorGrid },
		template: "<ColorGrid />",
	}),
};

export const Spacing: StoryObj = {
	render: () => ({
		components: { SpacingGrid },
		template: "<SpacingGrid />",
	}),
};

export const BorderWidth: StoryObj = {
	render: () => ({
		components: { BorderWidthGrid },
		template: "<BorderWidthGrid />",
	}),
};

export const BorderRadius: StoryObj = {
	render: () => ({
		components: { BorderRadiusGrid },
		template: "<BorderRadiusGrid />",
	}),
};

export const BoxShadow: StoryObj = {
	render: () => ({
		components: { BoxShadowGrid },
		template: "<BoxShadowGrid />",
	}),
};

export const FontFamily: StoryObj = {
	render: () => ({
		components: { FontFamilyGrid },
		template: "<FontFamilyGrid />",
	}),
};

export const FontSize: StoryObj = {
	render: () => ({
		components: { FontSizeGrid },
		template: "<FontSizeGrid />",
	}),
};

export const FontWeight: StoryObj = {
	render: () => ({
		components: { FontWeightGrid },
		template: "<FontWeightGrid />",
	}),
};

export const LineHeight: StoryObj = {
	render: () => ({
		components: { LineHeightGrid },
		template: "<LineHeightGrid />",
	}),
};

export const Easing: StoryObj = {
	render: () => ({
		components: { EasingGrid },
		template: "<EasingGrid />",
	}),
};
