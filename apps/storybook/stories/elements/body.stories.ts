import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Body",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<div>
				<h1>Design Tokens &amp; Typography</h1>
				<p>A design system is a <strong>shared language</strong> — a set of decisions captured in tokens, patterns, and documentation. When every designer and engineer draws from the <em>same source of truth</em>, the result is a product that feels <strong><em>coherent and intentional</em></strong> even as the team behind it grows.</p>

				<h2>Why the Body Element Matters</h2>
				<p>The <code>body</code> element is the first typographic decision a design system makes. By setting a sensible baseline — appropriate <abbr title="font-family, font-size, line-height">font metrics</abbr>, comfortable spacing, and sufficient color contrast — every piece of content benefits <mark>without any additional work</mark> from the author.</p>
				<p>Styleframe compiles tokens into <abbr title="Cascading Style Sheets">CSS</abbr> custom properties. Referencing a token with <code>ref()</code> creates a live <code>var()</code> expression, so a single token update propagates everywhere it is used — selectors, utilities, and component recipes alike.</p>

				<h3>Inherited Properties</h3>
				<p>CSS cascade and inheritance are features, not bugs. Properties declared on <code>body</code> flow down to every descendant automatically:</p>
				<ul>
					<li><strong>Font family</strong> — sets the base typeface for all text</li>
					<li><strong>Font size</strong> — establishes the root of the typographic scale</li>
					<li><strong>Line height</strong> — controls vertical spacing between lines</li>
					<li><strong>Color</strong> — defines the default foreground text color</li>
					<li><strong>Background</strong> — defines the default page background</li>
					<li><strong>Font smoothing</strong> — enables antialiased rendering on supporting platforms</li>
				</ul>

				<h3>Theming Without JavaScript</h3>
				<p>Because tokens compile to custom properties, theming requires no runtime overhead. The steps are straightforward:</p>
				<ol>
					<li>Define a theme with overridden token values in your <code>*.styleframe.ts</code> file.</li>
					<li>Apply <code>data-theme="dark"</code> to any element in the <abbr title="Document Object Model">DOM</abbr>.</li>
					<li>All custom properties in that subtree update instantly — <mark>no re-renders, no class toggling</mark>.</li>
				</ol>

				<h2>Inline Text Elements</h2>
				<p>Body copy regularly contains a mix of semantic inline elements. <strong>Bold</strong> draws attention to key terms. <em>Italics</em> add nuance or mark titles. <del>Deleted text</del> and <ins>inserted text</ins> communicate change. Superscripts like E=mc<sup>2</sup> and subscripts like H<sub>2</sub>O adjust automatically to the baseline. <mark>Highlighted spans</mark> call out passages without altering the surrounding rhythm.</p>
				<p>Technical writing leans on <code>inline code</code> to distinguish identifiers from prose, while <abbr title="HyperText Markup Language">HTML</abbr> abbreviations surface definitions on hover. Well-placed <a href="#">links to related resources</a> complete the picture — all of these elements inherit the body's font metrics and only deviate where their own element styles explicitly say otherwise.</p>
			</div>
		`,
	}),
};
