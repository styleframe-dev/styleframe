import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Pre",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<pre>function hello() {
    return "Hello, world!";
}</pre>`,
	}),
};

export const WithCode: Story = {
	render: () => ({
		template: `<pre><code>const x = 1;
const y = 2;
console.log(x + y);</code></pre>`,
	}),
};

export const LongLine: Story = {
	render: () => ({
		template: `<pre>This is a very long line of preformatted text that should scroll horizontally when it exceeds the width of its container instead of wrapping to the next line.</pre>`,
	}),
};
