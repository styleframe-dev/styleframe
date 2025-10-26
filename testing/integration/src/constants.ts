export const DEFAULT_VITE_CONFIG = `import { defineConfig } from 'vite';

export default defineConfig({});`;

export const DEFAULT_STYLEFRAME_CONFIG = `import { styleframe } from "styleframe";

const s = styleframe();

const colorPrimary = s.variable("color--primary", "blue");
const colorSecondary = s.variable("color--secondary", "pink");

s.selector(".h1", {
			color: s.ref(colorPrimary),
			background: s.ref(colorSecondary),
});

export default s;
`;
