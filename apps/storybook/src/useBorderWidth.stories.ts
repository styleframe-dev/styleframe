import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useBorderWidth.styleframe?css";
import { borderWidthPreview } from "./useBorderWidth.styleframe?recipe";

const BorderWidthSwatch = defineComponent({
	name: "BorderWidthSwatch",
	props: {
		borderWidth: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "border-width-swatch",
				},
				[
					h("div", {
						class: borderWidthPreview({ borderWidth: props.borderWidth }),
					}),
					h("span", props.borderWidth),
				],
			);
	},
});

const BorderWidthGrid = defineComponent({
	name: "BorderWidthGrid",
	setup() {
		const borderWidths = ["none", "thin", "medium", "thick"];

		return () =>
			h(
				"div",
				{
					class: "border-width-grid",
				},
				borderWidths.map((borderWidth) =>
					h(BorderWidthSwatch, { borderWidth }),
				),
			);
	},
});

const meta = {
	title: "Theme/Borders/useBorderWidth",
	component: BorderWidthSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderWidth: {
			control: "select",
			options: ["none", "thin", "medium", "thick"],
		},
	},
} satisfies Meta<typeof BorderWidthSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderWidths: StoryObj = {
	render: () => ({
		components: { BorderWidthGrid },
		template: "<BorderWidthGrid />",
	}),
};

export const None: Story = {
	args: {
		borderWidth: "none",
	},
};

export const Thin: Story = {
	args: {
		borderWidth: "thin",
	},
};

export const Medium: Story = {
	args: {
		borderWidth: "medium",
	},
};

export const Thick: Story = {
	args: {
		borderWidth: "thick",
	},
};
