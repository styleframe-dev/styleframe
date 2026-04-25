import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "@/components/components/button/Button.vue";
import Input from "@/components/components/input/Input.vue";
import InputGroup from "@/components/components/input/InputGroup.vue";
import InputPrepend from "@/components/components/input/InputPrepend.vue";
import InputAppend from "@/components/components/input/InputAppend.vue";
import InputGrid from "@/components/components/input/preview/InputGrid.vue";
import InputSizeGrid from "@/components/components/input/preview/InputSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Input",
	component: Input,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the input",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the input",
		},
		invalid: {
			control: "boolean",
			description: "Whether the input is in an invalid state",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text",
		},
		disabled: {
			control: "boolean",
			description: "Whether the input is disabled",
		},
		readonly: {
			control: "boolean",
			description: "Whether the input is read-only",
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "default",
		size: "md",
		invalid: false,
		placeholder: "Enter text...",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { InputGrid },
		template: "<InputGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { InputSizeGrid },
		template: "<InputSizeGrid />",
	}),
};

// Individual color stories
export const Neutral: Story = {
	args: {
		color: "neutral",
		placeholder: "Neutral input",
	},
};

export const Light: Story = {
	args: {
		color: "light",
		placeholder: "Light input",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
		placeholder: "Dark input",
	},
};

// Variant stories
export const DefaultVariant: Story = {
	args: {
		variant: "default",
		placeholder: "Default variant",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		placeholder: "Soft variant",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		placeholder: "Ghost variant",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
		placeholder: "Small input",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		placeholder: "Medium input",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		placeholder: "Large input",
	},
};

// State stories
export const Invalid: Story = {
	args: {
		invalid: true,
		placeholder: "Invalid input",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: "Disabled input",
	},
};

export const ReadOnly: Story = {
	args: {
		readonly: true,
		modelValue: "Read-only value",
	},
};

// Inline addon stories — demonstrate prefix/suffix INSIDE the input wrapper
export const WithPrefix: StoryObj = {
	render: (args) => ({
		components: { Input },
		setup() {
			return { args };
		},
		template: `
			<Input v-bind="args" placeholder="0.00">
				<template #prefix>$</template>
			</Input>
		`,
	}),
	args: {
		size: "md",
	},
};

export const WithSuffix: StoryObj = {
	render: (args) => ({
		components: { Input },
		setup() {
			return { args };
		},
		template: `
			<Input v-bind="args" placeholder="search...">
				<template #suffix>⌘K</template>
			</Input>
		`,
	}),
	args: {
		size: "md",
	},
};

export const WithPrefixAndSuffix: StoryObj = {
	render: (args) => ({
		components: { Input },
		setup() {
			return { args };
		},
		template: `
			<Input v-bind="args" placeholder="0.00">
				<template #prefix>$</template>
				<template #suffix>.00</template>
			</Input>
		`,
	}),
	args: {
		size: "md",
	},
};

// External addon stories — demonstrate the multi-part group composition.
// Prepend/append are transparent slots; drop in a real <Button> (or any
// other component) and its own styling takes over.
export const WithPrepend: StoryObj = {
	render: (args) => ({
		components: { Button, Input, InputGroup, InputPrepend },
		setup() {
			return { args };
		},
		template: `
			<InputGroup :size="args.size">
				<InputPrepend>
					<Button color="neutral" variant="outline" :size="args.size" label="https://" />
				</InputPrepend>
				<Input v-bind="args" placeholder="example.com" />
			</InputGroup>
		`,
	}),
	args: {
		size: "md",
	},
};

export const WithAppend: StoryObj = {
	render: (args) => ({
		components: { Button, Input, InputGroup, InputAppend },
		setup() {
			return { args };
		},
		template: `
			<InputGroup :size="args.size">
				<Input v-bind="args" placeholder="Search..." />
				<InputAppend>
					<Button color="primary" variant="solid" :size="args.size" label="Search" />
				</InputAppend>
			</InputGroup>
		`,
	}),
	args: {
		size: "md",
	},
};

export const WithPrependAndAppend: StoryObj = {
	render: (args) => ({
		components: { Button, Input, InputGroup, InputPrepend, InputAppend },
		setup() {
			return { args };
		},
		template: `
			<InputGroup :size="args.size">
				<InputPrepend>
					<Button color="neutral" variant="outline" :size="args.size" label="USD" />
				</InputPrepend>
				<Input v-bind="args" placeholder="0.00" />
				<InputAppend>
					<Button color="primary" variant="solid" :size="args.size" label="Submit" />
				</InputAppend>
			</InputGroup>
		`,
	}),
	args: {
		size: "md",
	},
};
