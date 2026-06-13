import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ContextMenu from "@/components/components/context-menu/ContextMenu.vue";
import ContextMenuCheckboxItem from "@/components/components/context-menu/ContextMenuCheckboxItem.vue";
import ContextMenuItem from "@/components/components/context-menu/ContextMenuItem.vue";
import ContextMenuLabel from "@/components/components/context-menu/ContextMenuLabel.vue";
import ContextMenuSeparator from "@/components/components/context-menu/ContextMenuSeparator.vue";
import ContextMenuShortcut from "@/components/components/context-menu/ContextMenuShortcut.vue";
import ContextMenuSubTrigger from "@/components/components/context-menu/ContextMenuSubTrigger.vue";
import ContextMenuGrid from "@/components/components/context-menu/preview/ContextMenuGrid.vue";
import ContextMenuSizeGrid from "@/components/components/context-menu/preview/ContextMenuSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const parts = {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSubTrigger,
};

const meta = {
	title: "Theme/Recipes/Overlays/ContextMenu",
	component: ContextMenu,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the context menu",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the context menu",
		},
	},
	render: (args) => ({
		components: parts,
		setup() {
			return { args };
		},
		template: `
			<div class="context-menu-grid">
				<ContextMenu v-bind="args">
					<ContextMenuLabel :color="args.color" :size="args.size">Actions</ContextMenuLabel>
					<ContextMenuItem v-bind="args">
						Back
						<ContextMenuShortcut :color="args.color" :size="args.size">⌘[</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem v-bind="args" disabled>Forward</ContextMenuItem>
					<ContextMenuItem v-bind="args">
						Reload
						<ContextMenuShortcut :color="args.color" :size="args.size">⌘R</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator :color="args.color" />
					<ContextMenuCheckboxItem v-bind="args" :checked="true">Show Bookmarks</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem v-bind="args">Show Full URLs</ContextMenuCheckboxItem>
					<ContextMenuSeparator :color="args.color" />
					<ContextMenuSubTrigger v-bind="args">More Tools</ContextMenuSubTrigger>
					<ContextMenuSeparator :color="args.color" />
					<ContextMenuItem v-bind="args" destructive>
						Delete
						<ContextMenuShortcut :color="args.color" :size="args.size">⌘⌫</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenu>
			</div>
		`,
	}),
} satisfies Meta<typeof ContextMenu>;

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
		components: { ContextMenuGrid },
		template: "<ContextMenuGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ContextMenuSizeGrid },
		template: "<ContextMenuSizeGrid />",
	}),
};

// Color stories
export const Neutral: Story = { args: { color: "neutral" } };
export const Light: Story = { args: { color: "light" } };
export const Dark: Story = { args: { color: "dark" } };

// Variant stories
export const Solid: Story = { args: { variant: "solid" } };
export const Soft: Story = { args: { variant: "soft" } };
export const Subtle: Story = { args: { variant: "subtle" } };

// Size stories
export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

// Feature stories
export const WithCheckboxItems: StoryObj = {
	render: () => ({
		components: parts,
		template: `
			<div class="context-menu-grid">
				<ContextMenu>
					<ContextMenuLabel inset>Appearance</ContextMenuLabel>
					<ContextMenuCheckboxItem :checked="true">Show Toolbar</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem :checked="true">Show Bookmarks</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
				</ContextMenu>
			</div>
		`,
	}),
};

export const WithSubmenu: StoryObj = {
	render: () => ({
		components: parts,
		template: `
			<div class="context-menu-grid">
				<ContextMenu>
					<ContextMenuItem>New Tab</ContextMenuItem>
					<ContextMenuItem>New Window</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuSubTrigger :open="true">Share</ContextMenuSubTrigger>
					<ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
				</ContextMenu>
			</div>
		`,
	}),
};

export const Destructive: StoryObj = {
	render: () => ({
		components: parts,
		template: `
			<div class="context-menu-grid">
				<ContextMenu>
					<ContextMenuItem>Edit</ContextMenuItem>
					<ContextMenuItem>Duplicate</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem destructive>
						Delete
						<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenu>
			</div>
		`,
	}),
};

export const Inset: StoryObj = {
	render: () => ({
		components: parts,
		template: `
			<div class="context-menu-grid">
				<ContextMenu>
					<ContextMenuLabel inset>People</ContextMenuLabel>
					<ContextMenuCheckboxItem :checked="true">Pedro Duarte</ContextMenuCheckboxItem>
					<ContextMenuItem inset>Colm Tuite</ContextMenuItem>
					<ContextMenuItem inset>Jakob Nielsen</ContextMenuItem>
				</ContextMenu>
			</div>
		`,
	}),
};
