import { type ChildProcess, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

/**
 * The site root serves the home page, for every client.
 *
 * `@uxfront/layer-docs` ships a Nitro `request`-hook plugin that 302s `/` to
 * `/llms.txt` for `Accept: text/markdown` and for `curl/*` user agents. It is
 * disabled in `nuxt.config.ts` (see the `nitro.ignore` comment there for why).
 * This guard is what makes that stay true: the plugin is a dependency's file,
 * so a layer upgrade can reintroduce the redirect with no diff in this repo,
 * and the failure is invisible to every other check we run — prerendering
 * writes a correct `index.html` either way, because the hook only fires on a
 * live request.
 *
 * It must boot the real server. The redirect lives in a `request` hook that
 * runs ahead of Nitro's public-asset handler, so reading `.output/public` (what
 * the other build guards do) cannot see it, and `nuxt dev` does not exercise
 * the compiled plugin list at all.
 *
 * `curl/8.7.1` is not decoration — it is the exact shape that was reported as
 * a broken home page, and the case a plain `fetch` would miss.
 *
 * Requires a prior `nuxt build`. Excluded from the default `pnpm test` run (see
 * `vitest.config.ts`); runs via `pnpm --filter @styleframe/docs test:build` in
 * the docs build job, against the artifact that job just produced.
 */

const SERVER_ENTRY = fileURLToPath(
	new URL("../.output/server/index.mjs", import.meta.url),
);

const BROWSER_UA =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
	"(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

let server: ChildProcess;
let origin: string;

/** Resolve once the server accepts connections, so tests never race the boot. */
async function waitUntilListening(url: string, deadlineMs = 30_000) {
	const giveUpAt = Date.now() + deadlineMs;

	while (Date.now() < giveUpAt) {
		if (server.exitCode !== null) {
			throw new Error(
				`server exited with code ${server.exitCode} before accepting connections`,
			);
		}

		try {
			await fetch(url, { redirect: "manual" });
			return;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 250));
		}
	}

	throw new Error(`server did not listen within ${deadlineMs}ms`);
}

beforeAll(async () => {
	// Port 0 lets the OS pick a free one, so a parallel suite or a stray dev
	// server cannot make this fail for an unrelated reason.
	server = spawn(process.execPath, [SERVER_ENTRY], {
		env: { ...process.env, PORT: "0", HOST: "127.0.0.1", NITRO_PORT: "0" },
		stdio: ["ignore", "pipe", "pipe"],
	});

	const address = await new Promise<string>((resolve, reject) => {
		let output = "";

		server.stdout?.on("data", (chunk: Buffer) => {
			output += chunk.toString();
			const match = output.match(/http:\/\/\S+?:(\d+)/);
			if (match) {
				resolve(`http://127.0.0.1:${match[1]}`);
			}
		});

		server.on("error", reject);
		server.on("exit", (code) =>
			reject(new Error(`server exited with code ${code}: ${output}`)),
		);
	});

	origin = address;
	await waitUntilListening(origin);
}, 60_000);

afterAll(() => {
	server?.kill();
});

describe("built Node server", () => {
	it.each([
		["a browser", { "user-agent": BROWSER_UA, accept: "text/html" }],
		["curl", { "user-agent": "curl/8.7.1", accept: "*/*" }],
		["a markdown-preferring client", { accept: "text/markdown" }],
	])("serves the home page at / to %s", async (_client, headers) => {
		const response = await fetch(origin, { headers, redirect: "manual" });

		expect(
			response.status,
			`expected 200, got ${response.status} → ${response.headers.get("location")}`,
		).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/html");
		expect(await response.text()).toContain("<html");
	});

	it("still serves /llms.txt", async () => {
		const response = await fetch(`${origin}/llms.txt`, { redirect: "manual" });

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/plain");
	});
});
