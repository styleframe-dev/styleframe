import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Img",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<p>
				Text with an inline
				<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect fill='%233b82f6' width='24' height='24' rx='4'/%3E%3C/svg%3E" alt="Example" width="24" height="24" />
				image that is vertically aligned to middle.
			</p>
		`,
	}),
};

export const Svg: Story = {
	render: () => ({
		template: `
			<p>
				Text with an inline
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect fill="#3b82f6" width="24" height="24" rx="4" /></svg>
				SVG element that is vertically aligned to middle.
			</p>
		`,
	}),
};
