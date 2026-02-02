/**
 * Generate the extension module content.
 * This is what *.styleframe.ts files receive when they import from 'virtual:styleframe'.
 * It imports the config directly and returns the same instance.
 */
export function generateExtensionModule(configPath: string): string {
	return `
import config from '${configPath}';

export function styleframe() {
	return config;
}

export default config;
`;
}
