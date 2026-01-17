import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useBreakpoint.styleframe?css";
import { breakpointPreview } from "./useBreakpoint.styleframe?recipe";

const breakpointValues: Record<string, number> = {
	xs: 0,
	sm: 576,
	md: 992,
	lg: 1200,
	xl: 1440,
};

const maxBreakpoint = 1440;

const BreakpointSwatch = defineComponent({
	name: "BreakpointSwatch",
	props: {
		breakpoint: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const value = breakpointValues[props.breakpoint] || 0;
		const barWidth = Math.max(10, (value / maxBreakpoint) * 100);

		return () =>
			h(
				"div",
				{
					class: `breakpoint-swatch ${breakpointPreview({ breakpoint: props.breakpoint })}`,
				},
				[
					h(
						"div",
						{ class: "breakpoint-name" },
						props.breakpoint.toUpperCase(),
					),
					h("div", { class: "breakpoint-value" }, `${value}px`),
					h("div", {
						class: "breakpoint-bar",
						style: { width: `${barWidth}%` },
					}),
				],
			);
	},
});

const BreakpointGrid = defineComponent({
	name: "BreakpointGrid",
	setup() {
		const breakpoints = ["xs", "sm", "md", "lg", "xl"];

		return () =>
			h(
				"div",
				{
					class: "breakpoint-grid",
				},
				breakpoints.map((breakpoint) => h(BreakpointSwatch, { breakpoint })),
			);
	},
});

const meta = {
	title: "Theme/Layout/useBreakpoint",
	component: BreakpointSwatch,
	tags: ["autodocs"],
	argTypes: {
		breakpoint: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
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
