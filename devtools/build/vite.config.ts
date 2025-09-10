import { createViteConfig } from "@styleframe/config-vite";

const __dirname = new URL(".", import.meta.url).pathname;

export default createViteConfig("build", __dirname);
