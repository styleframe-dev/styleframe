import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Kbd",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>`,
	}),
};

export const Nested: Story = {
	render: () => ({
		template: `
			<p>Press <kbd><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd></kbd> to open developer tools.</p>
		`,
	}),
};

export const Single: Story = {
	render: () => ({
		template: `<p>Press <kbd>Enter</kbd> to submit the form.</p>`,
	}),
};
