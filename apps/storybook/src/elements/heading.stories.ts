import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Heading",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<div>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<h5>Heading 5</h5>
				<h6>Heading 6</h6>
			</div>
		`,
	}),
};

export const H1: Story = {
	render: () => ({
		template: `<h1>Heading 1</h1>`,
	}),
};

export const H2: Story = {
	render: () => ({
		template: `<h2>Heading 2</h2>`,
	}),
};

export const H3: Story = {
	render: () => ({
		template: `<h3>Heading 3</h3>`,
	}),
};

export const H4: Story = {
	render: () => ({
		template: `<h4>Heading 4</h4>`,
	}),
};

export const H5: Story = {
	render: () => ({
		template: `<h5>Heading 5</h5>`,
	}),
};

export const H6: Story = {
	render: () => ({
		template: `<h6>Heading 6</h6>`,
	}),
};

export const WithParagraph: Story = {
	render: () => ({
		template: `
			<div>
				<h1>Main Title</h1>
				<p>A paragraph following the heading to show spacing.</p>
				<h2>Section Title</h2>
				<p>Another paragraph showing the visual hierarchy.</p>
			</div>
		`,
	}),
};
