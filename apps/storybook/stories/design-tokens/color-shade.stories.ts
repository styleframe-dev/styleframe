import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ColorShadeSwatch from "../../src/components/design-tokens/colors/ColorShadeSwatch.vue";
import StoryGrid from "../../src/components/primitives/StoryGrid.vue";

const shades = ["base", "50", "100", "150", "200"];
const colors = [
	"primary",
	"secondary",
	"success",
	"warning",
	"danger",
	"info",
	"gray",
];

const shadeLabels: Record<string, string> = {
	base: "Base",
	"50": "Shade 50 (-5%)",
	"100": "Shade 100 (-10%)",
	"150": "Shade 150 (-15%)",
	"200": "Shade 200 (-20%)",
};

const meta = {
	title: "Design Tokens/Colors/Color Shade",
	component: ColorShadeSwatch,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
		},
		value: {
			control: "select",
			options: shades,
		},
	},
} satisfies Meta<typeof ColorShadeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { colors, shades, shadeLabels };
		},
		template: `
			<div v-for="color in colors" :key="color" style="margin-bottom: 32px;">
				<h3 style="margin-bottom: 12px; text-transform: capitalize;">{{ color }}</h3>
				<StoryGrid :items="shades">
					<template #default="{ item }">
						<ColorShadeSwatch :name="item" :color="color" :value="item" :label="shadeLabels[item]" />
					</template>
				</StoryGrid>
			</div>
		`,
	}),
};

export const PrimaryShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="primary" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const SecondaryShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="secondary" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const SuccessShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="success" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const WarningShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="warning" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const DangerShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="danger" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const InfoShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="info" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const GrayShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" color="gray" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Base: Story = {
	args: {
		name: "base",
		color: "primary",
		value: "base",
		label: "Base",
	},
};

export const Shade50: Story = {
	args: {
		name: "50",
		color: "primary",
		value: "50",
		label: "Shade 50 (-5%)",
	},
};

export const Shade100: Story = {
	args: {
		name: "100",
		color: "primary",
		value: "100",
		label: "Shade 100 (-10%)",
	},
};

export const Shade150: Story = {
	args: {
		name: "150",
		color: "primary",
		value: "150",
		label: "Shade 150 (-15%)",
	},
};

export const Shade200: Story = {
	args: {
		name: "200",
		color: "primary",
		value: "200",
		label: "Shade 200 (-20%)",
	},
};
