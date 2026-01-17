import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useBoxShadow.styleframe?css";
import { boxShadowPreview } from "./useBoxShadow.styleframe?recipe";

const BoxShadowSwatch = defineComponent({
	name: "BoxShadowSwatch",
	props: {
		boxShadow: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "box-shadow-swatch",
				},
				[
					h(
						"div",
						{
							class: boxShadowPreview({ boxShadow: props.boxShadow }),
						},
						props.boxShadow,
					),
				],
			);
	},
});

const BoxShadowGrid = defineComponent({
	name: "BoxShadowGrid",
	setup() {
		const boxShadows = [
			"none",
			"xs",
			"sm",
			"md",
			"lg",
			"xl",
			"2xl",
			"inner",
			"ring",
		];

		return () =>
			h(
				"div",
				{
					class: "box-shadow-grid",
				},
				boxShadows.map((boxShadow) => h(BoxShadowSwatch, { boxShadow })),
			);
	},
});

const meta = {
	title: "Theme/Shadows/useBoxShadow",
	component: BoxShadowSwatch,
	tags: ["autodocs"],
	argTypes: {
		boxShadow: {
			control: "select",
			options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "inner", "ring"],
		},
	},
} satisfies Meta<typeof BoxShadowSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBoxShadows: StoryObj = {
	render: () => ({
		components: { BoxShadowGrid },
		template: "<BoxShadowGrid />",
	}),
};

export const None: Story = {
	args: {
		boxShadow: "none",
	},
};

export const ExtraSmall: Story = {
	args: {
		boxShadow: "xs",
	},
};

export const Small: Story = {
	args: {
		boxShadow: "sm",
	},
};

export const Medium: Story = {
	args: {
		boxShadow: "md",
	},
};

export const Large: Story = {
	args: {
		boxShadow: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		boxShadow: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		boxShadow: "2xl",
	},
};

export const Inner: Story = {
	args: {
		boxShadow: "inner",
	},
};

export const Ring: Story = {
	args: {
		boxShadow: "ring",
	},
};
