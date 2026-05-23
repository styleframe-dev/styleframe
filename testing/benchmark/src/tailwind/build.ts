import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderDocument } from "../template";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const RESULTS = join(ROOT, "results");
const CONFIG_CSS = join(dirname(fileURLToPath(import.meta.url)), "config.css");

export type TailwindBuildResult = {
	dir: string;
	html: string;
	css: string;
};

export function buildTailwind(
	bodyHtml: string,
	pageName: string,
): TailwindBuildResult {
	const dir = join(RESULTS, `${pageName}/tailwind`);
	const html = renderDocument(bodyHtml, "./index.css");

	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, "index.html"), html, "utf-8");

	// Write input.css with relative @source so Tailwind only scans THIS page's HTML.
	// Run the CLI from the page directory to prevent auto-discovery of other files.
	const configCss = readFileSync(CONFIG_CSS, "utf-8");
	writeFileSync(join(dir, "input.css"), configCss, "utf-8");

	execFileSync(
		"pnpm",
		[
			"exec",
			"tailwindcss",
			"-i",
			join(dir, "input.css"),
			"-o",
			join(dir, "index.css"),
			"--minify",
		],
		{ cwd: dir, stdio: "pipe" },
	);

	const css = readFileSync(join(dir, "index.css"), "utf-8");
	return { dir, html, css };
}
