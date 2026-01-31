import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "../components/swatch.styleframe?css";
import "./box-shadow.styleframe?css";
import { boxShadowPreview } from "./box-shadow.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "../components/TokenSwatch";

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

const BoxShadowSwatch = createSwatchComponent(
	"BoxShadowSwatch",
	"boxShadow",
	(boxShadow) => boxShadowPreview({ boxShadow }),
	{ layout: "box" },
);

const BoxShadowGrid = createGridComponent(
	"BoxShadowGrid",
	boxShadows,
	BoxShadowSwatch,
	"boxShadow",
	"grid",
);

const meta = {
	title: "Design Tokens/Shadows/Box Shadow",
	component: BoxShadowSwatch,
	tags: ["autodocs"],
	argTypes: {
		boxShadow: {
			control: "select",
			options: boxShadows,
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
