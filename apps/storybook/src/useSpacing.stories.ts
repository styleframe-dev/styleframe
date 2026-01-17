import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useSpacing.styleframe?css";
import { spacingPreview } from "./useSpacing.styleframe?recipe";

const spacingValues: Record<string, string> = {
	xs: "0.25rem",
	sm: "0.5rem",
	md: "1rem",
	lg: "1.5rem",
	xl: "2rem",
	"2xl": "3rem",
};

const SpacingSwatch = defineComponent({
	name: "SpacingSwatch",
	props: {
		spacing: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "spacing-swatch",
				},
				[
					h("div", { class: "spacing-name" }, props.spacing),
					h("div", { class: "spacing-value" }, spacingValues[props.spacing]),
					h("div", {
						class: spacingPreview({ spacing: props.spacing }),
					}),
				],
			);
	},
});

const SpacingGrid = defineComponent({
	name: "SpacingGrid",
	setup() {
		const spacings = ["xs", "sm", "md", "lg", "xl", "2xl"];

		return () =>
			h(
				"div",
				{
					class: "spacing-grid",
				},
				spacings.map((spacing) => h(SpacingSwatch, { spacing })),
			);
	},
});

const meta = {
	title: "Theme/Spacing/useSpacing",
	component: SpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		spacing: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl", "2xl"],
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
