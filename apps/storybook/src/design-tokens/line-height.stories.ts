import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import TypographySwatch from "../components/TypographySwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./line-height.styleframe?css";
import { lineHeightPreview } from "./line-height.styleframe?ts";
import { lineHeightValues } from "./line-height.styleframe";

const lineHeights = Object.keys(
	lineHeightValues,
) as (keyof typeof lineHeightValues)[];

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
			h(TypographySwatch, {
				name: props.lineHeight,
				value:
					lineHeightValues[props.lineHeight as keyof typeof lineHeightValues],
				previewClass: lineHeightPreview({ lineHeight: props.lineHeight }),
				sampleText,
			});
	},
});

const meta = {
	title: "Design Tokens/Typography/Line Height",
	component: LineHeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		lineHeight: {
			control: "select",
			options: lineHeights,
		},
	},
} satisfies Meta<typeof LineHeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLineHeights: StoryObj = {
	render: () => ({
		components: { LineHeightSwatch, StoryGrid },
		setup() {
			return { lineHeights };
		},
		template: `
			<StoryGrid :items="lineHeights" layout="list" v-slot="{ item }">
				<LineHeightSwatch :line-height="item" />
			</StoryGrid>
		`,
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
