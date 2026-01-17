import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useSpacing.styleframe?css";
import { spacingPreview } from "./useSpacing.styleframe?recipe";
import { spacingValues } from "./useSpacing.styleframe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const spacings = Object.keys(spacingValues);

const SpacingSwatch = createSwatchComponent(
	"SpacingSwatch",
	"spacing",
	(spacing) => spacingPreview({ spacing }),
	{ layout: "row", values: spacingValues },
);

const SpacingGrid = createGridComponent(
	"SpacingGrid",
	spacings,
	SpacingSwatch,
	"spacing",
	"list",
);

const meta = {
	title: "Theme/Spacing/useSpacing",
	component: SpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		spacing: {
			control: "select",
			options: spacings,
		},
	},
} satisfies Meta<typeof SpacingSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacings: StoryObj = {
	render: () => ({
		components: { SpacingGrid },
		template: "<SpacingGrid />",
	}),
};

export const ExtraSmall: Story = {
	args: {
		spacing: "xs",
	},
};

export const Small: Story = {
	args: {
		spacing: "sm",
	},
};

export const Medium: Story = {
	args: {
		spacing: "md",
	},
};

export const Large: Story = {
	args: {
		spacing: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		spacing: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		spacing: "2xl",
	},
};
