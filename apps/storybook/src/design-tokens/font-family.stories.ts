import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "../components/swatch.styleframe?css";
import "./font-family.styleframe?css";
import { fontFamilyPreview } from "./font-family.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "../components/TokenSwatch";

const fontFamilies = ["base", "print", "mono"];

const FontFamilySwatch = createSwatchComponent(
	"FontFamilySwatch",
	"fontFamily",
	(fontFamily) => fontFamilyPreview({ fontFamily }),
	{
		layout: "text",
		sampleText: "The quick brown fox jumps over the lazy dog. 0123456789",
	},
);

const FontFamilyGrid = createGridComponent(
	"FontFamilyGrid",
	fontFamilies,
	FontFamilySwatch,
	"fontFamily",
	"list",
);

const meta = {
	title: "Design Tokens/Typography/Font Family",
	component: FontFamilySwatch,
	tags: ["autodocs"],
	argTypes: {
		fontFamily: {
			control: "select",
			options: fontFamilies,
		},
	},
} satisfies Meta<typeof FontFamilySwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontFamilies: StoryObj = {
	render: () => ({
		components: { FontFamilyGrid },
		template: "<FontFamilyGrid />",
	}),
};

export const Base: Story = {
	args: {
		fontFamily: "base",
	},
};

export const Print: Story = {
	args: {
		fontFamily: "print",
	},
};

export const Mono: Story = {
	args: {
		fontFamily: "mono",
	},
};
