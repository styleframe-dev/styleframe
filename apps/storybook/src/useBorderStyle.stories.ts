import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useBorderStyle.styleframe?css";
import { borderStylePreview } from "./useBorderStyle.styleframe?recipe";

const BorderStyleSwatch = defineComponent({
	name: "BorderStyleSwatch",
	props: {
		borderStyle: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "border-style-swatch",
				},
				[
					h("div", {
						class: borderStylePreview({ borderStyle: props.borderStyle }),
					}),
					h("span", props.borderStyle),
				],
			);
	},
});

const BorderStyleGrid = defineComponent({
	name: "BorderStyleGrid",
	setup() {
		const borderStyles = [
			"none",
			"solid",
			"dashed",
			"dotted",
			"double",
			"groove",
			"inset",
			"outset",
		];

		return () =>
			h(
				"div",
				{
					class: "border-style-grid",
				},
				borderStyles.map((borderStyle) =>
					h(BorderStyleSwatch, { borderStyle }),
				),
			);
	},
});

const meta = {
	title: "Theme/Borders/useBorderStyle",
	component: BorderStyleSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderStyle: {
			control: "select",
			options: [
				"none",
				"solid",
				"dashed",
				"dotted",
				"double",
				"groove",
				"inset",
				"outset",
			],
		},
	},
} satisfies Meta<typeof BorderStyleSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderStyles: StoryObj = {
	render: () => ({
		components: { BorderStyleGrid },
		template: "<BorderStyleGrid />",
	}),
};

export const None: Story = {
	args: {
		borderStyle: "none",
	},
};

export const Solid: Story = {
	args: {
		borderStyle: "solid",
	},
};

export const Dashed: Story = {
	args: {
		borderStyle: "dashed",
	},
};

export const Dotted: Story = {
	args: {
		borderStyle: "dotted",
	},
};

export const Double: Story = {
	args: {
		borderStyle: "double",
	},
};

export const Groove: Story = {
	args: {
		borderStyle: "groove",
	},
};

export const Inset: Story = {
	args: {
		borderStyle: "inset",
	},
};

export const Outset: Story = {
	args: {
		borderStyle: "outset",
	},
};
