import { createViteConfig } from "@styleframe/config-vite/vite.config";

const __dirname = new URL(".", import.meta.url).pathname;

export default createViteConfig("styleframe", __dirname);
