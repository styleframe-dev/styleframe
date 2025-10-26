import shell from "shelljs";
import path from "node:path";
import fs from "node:fs";
import assert from "node:assert";

import { DEFAULT_STYLEFRAME_CONFIG, DEFAULT_VITE_CONFIG } from "./constants";

export function buildPackages(cwd: string) {
	shell.exec("pnpm run build:nodocs", { cwd });

	if (shell.error()) {
		console.error("Build failed");
		process.exit(1);
	}
}

function mapTarballsToPackages(
	cwd: string,
	files: string[],
): Record<string, string> {
	const scopePrefix = "@styleframe/";
	const map: Record<string, string> = {};

	files.forEach((file) => {
		// Remove `.tgz` extension
		const base = file.replace(/\.tgz$/, "");
		// Extract package name without version
		const name = base.replace(/-\d+\.\d+\.\d+$/, "");

		// Convert scoped packages
		const scopedName =
			name === "styleframe"
				? name
				: `${scopePrefix}${name.replace(/^styleframe-/, "")}`;

		map[scopedName] = path.join(cwd, file);
	});

	return map;
}

export function createPackageTarballs(
	cwd: string,
	{
		filter = [],
		outputDir = "dist",
	}: { filter?: string[]; outputDir?: string } = {},
) {
	shell.exec(
		`pnpm pack --recursive --pack-destination ${outputDir} ${filter.map((f) => `--filter '${f}'`).join(" ")}`,
		{
			cwd,
		},
	);

	const tarballCwd = `${cwd}/${outputDir}`;
	const tarballs = shell
		.exec(`ls *.tgz`, { cwd: tarballCwd })
		.stdout.split("\n")
		.filter(Boolean);

	return mapTarballsToPackages(tarballCwd, tarballs);
}

export function createStarterVitePackage(
	cwd: string,
	{
		outputDir = "tmp/vite",
		template = "vanilla-ts",
	}: {
		outputDir?: string;
		template?: string;
	} = {},
) {
	shell.exec(`pnpm create vite@latest --template ${template} ${outputDir}`, {
		cwd,
	});

	return path.join(cwd, outputDir);
}

export function installStyleframeUsingCLI(
	cwd: string,
	packageToTarballMap: Record<string, string>,
) {
	shell.exec(`npm install -D ${packageToTarballMap["styleframe"]}`, {
		cwd,
	});

	const packageJSONRaw = fs.readFileSync(`${cwd}/package.json`, "utf8");

	const packageJSON = JSON.parse(packageJSONRaw);
	packageJSON.overrides ||= {};

	for (const key in packageToTarballMap) {
		if (key.startsWith("@styleframe")) {
			packageJSON.overrides[key] = `file:${packageToTarballMap[key]}`;
		}
	}

	fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(packageJSON, null, 2));

	console.log(JSON.stringify(packageJSON, null, 2));

	shell.exec(`npm install`, {
		cwd,
	});

	fs.writeFileSync(`${cwd}/vite.config.ts`, DEFAULT_VITE_CONFIG);

	shell.exec(`npx styleframe init --cwd ${cwd}`, { cwd });

	const viteConfigFile = path.join(cwd, "vite.config.ts");
	const viteConfigContent = fs.readFileSync(viteConfigFile, "utf8");

	assert.equal(
		viteConfigContent,
		`import styleframe from 'styleframe/plugin/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [styleframe()],
});`,
	);
}

export function addStyleframeConfig(cwd: string) {
	fs.writeFileSync(`${cwd}/styleframe.config.ts`, DEFAULT_STYLEFRAME_CONFIG);
}

export function buildVite(cwd: string) {
	shell.exec(`npm run build`, {
		cwd,
	});
}

export function cleanup(dirs: string[]) {
	dirs.forEach((dir) => {
		shell.exec(`rm -rf ${dir}`);
	});
}
