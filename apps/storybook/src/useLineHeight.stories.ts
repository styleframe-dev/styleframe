import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useLineHeight.styleframe?css";
import { lineHeightPreview } from "./useLineHeight.styleframe?recipe";

const lineHeightValues: Record<string, string> = {
	tight: "1.2",
	snug: "1.35",
	normal: "1.5",
	relaxed: "1.65",
	loose: "1.9",
};

const sampleText =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

const LineHeightSwatch = defineComponent({
	name: "LineHeightSwatch",
	props: {
		lineHeight: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(
				"div",
				{
					class: "line-height-swatch",
				},
				[
					h("div", { class: "line-height-header" }, [
						h("span", { class: "line-height-name" }, props.lineHeight),
						h(
							"span",
							{ class: "line-height-value" },
							lineHeightValues[props.lineHeight],
						),
					]),
					h(
						"p",
						{
							class: lineHeightPreview({ lineHeight: props.lineHeight }),
						},
						sampleText,
					),
				],
			);
	},
});

const LineHeightGrid = defineComponent({
	name: "LineHeightGrid",
	setup() {
		const lineHeights = ["tight", "snug", "normal", "relaxed", "loose"];

		return () =>
			h(
				"div",
				{
					class: "line-height-grid",
				},
				lineHeights.map((lineHeight) => h(LineHeightSwatch, { lineHeight })),
			);
	},
});

const meta = {
	title: "Theme/Typography/useLineHeight",
	component: LineHeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		lineHeight: {
			control: "select",
			options: ["tight", "snug", "normal", "relaxed", "loose"],
		},
	},
} satisfies Meta<typeof LineHeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLineHeights: StoryObj = {
	render: () => ({
		components: { LineHeightGrid },
		template: "<LineHeightGrid />",
	}),
};

export const Tight: Story = {
	args: {
		lineHeight: "tight",
	},
};

export const Snug: Story = {
	args: {
		lineHeight: "snug",
	},
};

export const Normal: Story = {
	args: {
		lineHeight: "normal",
	},
};

export const Relaxed: Story = {
	args: {
		lineHeight: "relaxed",
	},
};

export const Loose: Story = {
	args: {
		lineHeight: "loose",
	},
};
