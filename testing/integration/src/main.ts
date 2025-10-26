import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import {
	buildPackages,
	createPackageTarballs,
	createStarterVitePackage,
	installStyleframeUsingCLI,
	cleanup,
	addStyleframeConfig,
	buildVite,
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
	filter: ["./engine/*", "./tooling/*", "./theme"],
});

/**
 * 3. Create starter vite package
 */

const viteStyleframeCLIOutputDir = createStarterVitePackage(os.tmpdir());

console.log("Starter Vite package created at:", viteStyleframeCLIOutputDir);

/**
 * 4. Install styleframe using the CLI
 */

installStyleframeUsingCLI(viteStyleframeCLIOutputDir, packageToTarballMap);

/**
 * 5. Add styleframe config
 */

addStyleframeConfig(viteStyleframeCLIOutputDir);

/**
 * 6. Build application
 */

buildVite(viteStyleframeCLIOutputDir);

/**
 * Cleanup
 */
cleanup([viteStyleframeCLIOutputDir]);
