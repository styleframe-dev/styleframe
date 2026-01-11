import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useColor.styleframe?css";
import { colorPreview } from "./useColor.styleframe?recipe";

console.log(colorPreview.toString());

const ColorSwatch = defineComponent({
	name: "ColorSwatch",
	props: {
		color: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "color-swatch",
				},
				[
					h("div", {
						class: colorPreview({ color: props.color }),
					}),
				],
			);
	},
});

const ColorGrid = defineComponent({
	name: "ColorGrid",
	setup() {
		const colors = [
			"primary",
			"secondary",
			"info",
			"success",
			"warning",
			"danger",
		];

		return () =>
			h(
				"div",
				{
					class: "color-grid",
				},
				colors.map((color) => h(ColorSwatch, { color })),
			);
	},
});

const meta = {
	title: "Theme/useColor",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "secondary", "info", "success", "warning", "danger"],
		},
	},
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: StoryObj = {
	render: () => ({
		components: { ColorGrid },
		template: "<ColorGrid />",
	}),
};

export const Primary: Story = {
	args: {
		color: "primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
	},
};

export const Info: Story = {
	args: {
		color: "info",
	},
};

export const Success: Story = {
	args: {
		color: "success",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
	},
};
