import shell from "shelljs";
import path from "path";

export function buildPackages(cwd: string) {
	shell.exec("pnpm run build:nodocs", { cwd });
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
	}: { filter: string[]; outputDir?: string } = {},
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
		template = "vanilla-ts",
		outputDir = "tmp/vite",
	}: {
		template?: string;
		outputDir?: string;
	} = {},
) {
	shell.exec(`pnpm create vite --template ${template} ${outputDir}`, { cwd });
}

export function installStyleframeUsingCLI(
	cwd: string,
	packageToTarballMap: Record<string, string>,
) {
	shell.exec(`pnpm install -D ${packageToTarballMap["styleframe"]}`, {
		cwd,
	});

	shell.exec(`pnpx styleframe init --cwd ${cwd}`, { cwd });
}
