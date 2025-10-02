import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageDir = path.join(__dirname, "../");

const packageJsonString = fs.readFileSync(
	path.join(packageDir, "package.json"),
	"utf8",
);

const packageJson = JSON.parse(packageJsonString);

const version = packageJson.version;
const description = packageJson.description;

fs.writeFileSync(
	path.join(packageDir, "src/package.ts"),
	`export const version = "${version}";
export const description = "${description}";
`,
);
