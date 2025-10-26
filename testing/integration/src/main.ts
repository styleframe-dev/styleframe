import { fileURLToPath } from "node:url";
import path from "node:path";
import {
	buildPackages,
	createPackageTarballs,
	createStarterVitePackage,
	installStyleframeUsingCLI,
} from "./commands";

const __dirname = fileURLToPath(import.meta.url);

const packageDir = path.join(__dirname, "..", "..");
const workspaceDir = path.join(packageDir, "..", "..");

/**
 * 1. Build styleframe packages
 */

buildPackages(workspaceDir);

/**
 * 2. Generate .tgz package files
 */

const packageToTarballMap = createPackageTarballs(workspaceDir, {
	filter: ["./engine", "./tooling", "./theme"],
});

/**
 * 3. Create starter vite package
 */

const viteStyleframeCLITarget = "tmp/vite-styleframe-cli";
const viteStyleframeCLIOutputDir = path.resolve(
	packageDir,
	"tmp/vite-styleframe-cli",
);

createStarterVitePackage(packageDir, {
	outputDir: viteStyleframeCLITarget,
});

/**
 * 4. Install styleframe using the CLI
 */

installStyleframeUsingCLI(viteStyleframeCLIOutputDir, packageToTarballMap);
