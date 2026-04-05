import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Button from "@/components/components/button/Button.vue";
import Modal from "@/components/components/modal/Modal.vue";
import ModalOverlay from "@/components/components/modal/ModalOverlay.vue";
import ModalHeader from "@/components/components/modal/ModalHeader.vue";
import ModalBody from "@/components/components/modal/ModalBody.vue";
import ModalFooter from "@/components/components/modal/ModalFooter.vue";
import ModalTitle from "@/components/components/modal/ModalTitle.vue";
import ModalDescription from "@/components/components/modal/ModalDescription.vue";
import ModalGrid from "@/components/components/modal/preview/ModalGrid.vue";
import ModalSizeGrid from "@/components/components/modal/preview/ModalSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the modal",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the modal",
		},
	},
	render: (args) => ({
		components: {
			Button,
			Modal,
			ModalOverlay,
			ModalHeader,
			ModalBody,
			ModalFooter,
			ModalTitle,
			ModalDescription,
		},
		setup() {
			const isOpen = ref(true);
			return { args, isOpen };
		},
		template: `
			<Button label="Open Modal" @click="isOpen = true" />
			<ModalOverlay v-show="isOpen" @click.self="isOpen = false">
				<Modal v-bind="args" style="max-width: 480px; width: 100%;">
					<ModalHeader v-bind="args">
						<ModalTitle>Modal Title</ModalTitle>
					</ModalHeader>
					<ModalBody v-bind="args">
						<ModalDescription>This is a modal description with some content.</ModalDescription>
					</ModalBody>
					<ModalFooter v-bind="args">
						<Button label="Close" v-bind="args" @click="isOpen = false" />
					</ModalFooter>
				</Modal>
			</ModalOverlay>
		`,
	}),
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { ModalGrid },
		template: "<ModalGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ModalSizeGrid },
		template: "<ModalSizeGrid />",
	}),
};

// Individual color stories
export const Neutral: Story = {
	args: {
		color: "neutral",
	},
};

export const Light: Story = {
	args: {
		color: "light",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
	},
};

// Fullscreen story
export const Fullscreen: Story = {
	render: (args) => ({
		components: {
			Button,
			Modal,
			ModalOverlay,
			ModalHeader,
			ModalBody,
			ModalFooter,
			ModalTitle,
			ModalDescription,
		},
		setup() {
			const isOpen = ref(false);
			return { args, isOpen };
		},
		template: `
			<Button label="Open Fullscreen Modal" @click="isOpen = true" />
			<ModalOverlay v-show="isOpen">
				<Modal v-bind="args" style="width: 100vw; height: 100vh; max-width: 100vw; border-radius: 0;">
					<ModalHeader v-bind="args">
						<ModalTitle>Fullscreen Modal</ModalTitle>
					</ModalHeader>
					<ModalBody v-bind="args" style="flex: 1;">
						<ModalDescription>This modal takes up the entire viewport.</ModalDescription>
					</ModalBody>
					<ModalFooter v-bind="args">
						<Button label="Close" variant="outline" color="neutral" @click="isOpen = false" />
					</ModalFooter>
				</Modal>
			</ModalOverlay>
		`,
	}),
	args: {
		color: "neutral",
		variant: "solid",
		size: "lg",
	},
};
