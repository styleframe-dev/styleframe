import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useColor.styleframe.css";
import { colorPreview } from "./useColor.styleframe";

console.log(colorPreview.toString());

const ColorSwatch = defineComponent({
	name: "ColorSwatch",
	props: {
		variant: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "8px",
					},
				},
				[
					h("div", {
						class: colorPreview({ color: props.variant }),
					}),
					h(
						"span",
						{ style: { fontSize: "14px", fontWeight: "500" } },
						props.label,
					),
				],
			);
	},
});

const ColorGrid = defineComponent({
	name: "ColorGrid",
	setup() {
		const colors = [
			{ variant: "primary", label: "Primary (#1E3A8A)" },
			{ variant: "secondary", label: "Secondary (#9333EA)" },
			{ variant: "info", label: "Info (#3B82F6)" },
			{ variant: "success", label: "Success (#10B981)" },
			{ variant: "warning", label: "Warning (#F59E0B)" },
			{ variant: "danger", label: "Danger (#EF4444)" },
		];

		return () =>
			h(
				"div",
				{
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: "24px",
						padding: "16px",
					},
				},
				colors.map((color) =>
					h(ColorSwatch, { variant: color.variant, label: color.label }),
				),
			);
	},
});

const meta = {
	title: "Theme/useColor",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "info", "success", "warning", "danger"],
		},
		label: { control: "text" },
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
		variant: "primary",
		label: "Primary (#1E3A8A)",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		label: "Secondary (#9333EA)",
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		label: "Info (#3B82F6)",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		label: "Success (#10B981)",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		label: "Warning (#F59E0B)",
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		label: "Danger (#EF4444)",
	},
};
