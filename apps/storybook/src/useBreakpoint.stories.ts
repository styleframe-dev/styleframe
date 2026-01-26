import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import "./components/swatch.styleframe?css";
import "./useBreakpoint.styleframe?css";
import { breakpointPreview } from "./useBreakpoint.styleframe?ts";
import { breakpointValues, breakpointWidths } from "./useBreakpoint.styleframe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const breakpoints = Object.keys(breakpointValues);

const maxBreakpoint = 1440;

const BreakpointSwatch = createSwatchComponent(
	"BreakpointSwatch",
	"breakpoint",
	(breakpoint) => breakpointPreview({ breakpoint }),
	{
		values: breakpointValues,
		formatName: (value) => value.toUpperCase(),
		renderPreview: (breakpoint) => {
			const value = breakpointWidths[breakpoint] || 0;
			const barWidth = Math.max(10, (value / maxBreakpoint) * 100);

			return h("div", {
				class: "breakpoint-bar",
				style: { width: `${barWidth}%` },
			});
		},
	},
);

const BreakpointGrid = createGridComponent(
	"BreakpointGrid",
	breakpoints,
	BreakpointSwatch,
	"breakpoint",
	"list",
);

const meta = {
	title: "Theme/Layout/useBreakpoint",
	component: BreakpointSwatch,
	tags: ["autodocs"],
	argTypes: {
		breakpoint: {
			control: "select",
			options: breakpoints,
		},
	},
} satisfies Meta<typeof BreakpointSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBreakpoints: StoryObj = {
	render: () => ({
		components: { BreakpointGrid },
		template: "<BreakpointGrid />",
	}),
};

export const ExtraSmall: Story = {
	args: {
		breakpoint: "xs",
	},
};

export const Small: Story = {
	args: {
		breakpoint: "sm",
	},
};

export const Medium: Story = {
	args: {
		breakpoint: "md",
	},
};

export const Large: Story = {
	args: {
		breakpoint: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		breakpoint: "xl",
	},
};
