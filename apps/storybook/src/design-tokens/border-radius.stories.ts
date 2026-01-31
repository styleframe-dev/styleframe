import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "../components/swatch.styleframe?css";
import "./border-radius.styleframe?css";
import { borderRadiusPreview } from "./border-radius.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "../components/TokenSwatch";

const borderRadiuses = ["none", "sm", "md", "lg", "xl", "full"];

const BorderRadiusSwatch = createSwatchComponent(
	"BorderRadiusSwatch",
	"borderRadius",
	(borderRadius) => borderRadiusPreview({ borderRadius }),
	{ layout: "box" },
);

const BorderRadiusGrid = createGridComponent(
	"BorderRadiusGrid",
	borderRadiuses,
	BorderRadiusSwatch,
	"borderRadius",
	"grid",
);

const meta = {
	title: "Design Tokens/Borders/Border Radius",
	component: BorderRadiusSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderRadius: {
			control: "select",
			options: borderRadiuses,
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
