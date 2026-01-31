import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import BorderSwatch from "../components/BorderSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./border-style.styleframe?css";
import { borderStylePreview } from "./border-style.styleframe?ts";

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
			h(BorderSwatch, {
				name: props.borderStyle,
				previewClass: borderStylePreview({ borderStyle: props.borderStyle }),
			});
	},
});

const meta = {
	title: "Design Tokens/Borders/Border Style",
	component: BorderStyleSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderStyle: {
			control: "select",
			options: borderStyles,
		},
	},
} satisfies Meta<typeof BorderStyleSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderStyles: StoryObj = {
	render: () => ({
		components: { BorderStyleSwatch, StoryGrid },
		setup() {
			return { borderStyles };
		},
		template: `
			<StoryGrid :items="borderStyles" layout="grid" v-slot="{ item }">
				<BorderStyleSwatch :border-style="item" />
			</StoryGrid>
		`,
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
