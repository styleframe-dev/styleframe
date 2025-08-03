/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import type { UserConfig } from "vite";

export declare function createViteConfig(
	options?: UserConfig["build"]["lib"],
): UserConfig;
