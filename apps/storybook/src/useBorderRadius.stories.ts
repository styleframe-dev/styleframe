import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useBorderRadius.styleframe?css";
import { borderRadiusPreview } from "./useBorderRadius.styleframe?recipe";

const BorderRadiusSwatch = defineComponent({
	name: "BorderRadiusSwatch",
	props: {
		borderRadius: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "border-radius-swatch",
				},
				[
					h("div", {
						class: borderRadiusPreview({ borderRadius: props.borderRadius }),
					}),
					h("span", props.borderRadius),
				],
			);
	},
});

const BorderRadiusGrid = defineComponent({
	name: "BorderRadiusGrid",
	setup() {
		const borderRadiuses = ["none", "sm", "md", "lg", "xl", "full"];

		return () =>
			h(
				"div",
				{
					class: "border-radius-grid",
				},
				borderRadiuses.map((borderRadius) =>
					h(BorderRadiusSwatch, { borderRadius }),
				),
			);
	},
});

const meta = {
	title: "Theme/Borders/useBorderRadius",
	component: BorderRadiusSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderRadius: {
			control: "select",
			options: ["none", "sm", "md", "lg", "xl", "full"],
		},
	},
} satisfies Meta<typeof BorderRadiusSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderRadiuses: StoryObj = {
	render: () => ({
		components: { BorderRadiusGrid },
		template: "<BorderRadiusGrid />",
	}),
};

export const None: Story = {
	args: {
		borderRadius: "none",
	},
};

export const Small: Story = {
	args: {
		borderRadius: "sm",
	},
};

export const Medium: Story = {
	args: {
		borderRadius: "md",
	},
};

export const Large: Story = {
	args: {
		borderRadius: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		borderRadius: "xl",
	},
};

export const Full: Story = {
	args: {
		borderRadius: "full",
	},
};
