import type { FigmaExportFormat } from "../../types";

interface Collection {
	id: string;
	name: string;
	modes: Array<{ id: string; name: string }>;
	variableCount: number;
}

// DOM Elements
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const importPanel = document.getElementById("import-panel")!;
const exportPanel = document.getElementById("export-panel")!;

// Import elements
const jsonInput = document.getElementById("json-input") as HTMLTextAreaElement;
const importBtn = document.getElementById("import-btn") as HTMLButtonElement;
const importPreview = document.getElementById("import-preview")!;
const importStatus = document.getElementById("import-status")!;

// Export elements
const collectionSelect = document.getElementById(
	"collection-select",
) as HTMLSelectElement;
const refreshBtn = document.getElementById("refresh-btn")!;
const exportBtn = document.getElementById("export-btn") as HTMLButtonElement;
const exportOutput = document.getElementById(
	"export-output",
) as HTMLTextAreaElement;
const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement;
const exportStatus = document.getElementById("export-status")!;

let currentMode: "import" | "export" = "import";
let collections: Collection[] = [];

/**
 * Initialize the UI
 */
function init(): void {
	// Tab switching
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const mode = tab.getAttribute("data-tab") as "import" | "export";
			switchTab(mode);
		});
	});

	// Import handlers
	jsonInput.addEventListener("input", handleJsonInput);
	importBtn.addEventListener("click", handleImport);

	// Export handlers
	refreshBtn.addEventListener("click", requestCollections);
	exportBtn.addEventListener("click", handleExport);
	copyBtn.addEventListener("click", handleCopy);

	// Request initial collections
	requestCollections();
}

/**
 * Switch between import and export tabs
 */
function switchTab(mode: "import" | "export"): void {
	currentMode = mode;

	tabs.forEach((tab) => {
		tab.classList.toggle("active", tab.getAttribute("data-tab") === mode);
	});

	panels.forEach((panel) => {
		panel.classList.toggle("active", panel.id === `${mode}-panel`);
	});
}

/**
 * Handle JSON input changes
 */
function handleJsonInput(): void {
	const value = jsonInput.value.trim();
	hideStatus(importStatus);

	if (!value) {
		importPreview.innerHTML =
			'<div class="preview-empty">Paste JSON to preview variables</div>';
		importBtn.disabled = true;
		return;
	}

	try {
		const data = JSON.parse(value) as FigmaExportFormat;
		validateExportFormat(data);
		renderPreview(data);
		importBtn.disabled = false;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Invalid JSON";
		importPreview.innerHTML = `<div class="preview-empty" style="color: var(--figma-color-error)">${message}</div>`;
		importBtn.disabled = true;
	}
}

/**
 * Validate the export format
 */
function validateExportFormat(
	data: unknown,
): asserts data is FigmaExportFormat {
	if (typeof data !== "object" || data === null) {
		throw new Error("Invalid format: expected an object");
	}

	const obj = data as Record<string, unknown>;

	if (typeof obj.collection !== "string") {
		throw new Error('Invalid format: missing "collection" string');
	}

	if (!Array.isArray(obj.modes)) {
		throw new Error('Invalid format: missing "modes" array');
	}

	if (!Array.isArray(obj.variables)) {
		throw new Error('Invalid format: missing "variables" array');
	}
}

/**
 * Render the variable preview
 */
function renderPreview(data: FigmaExportFormat): void {
	if (data.variables.length === 0) {
		importPreview.innerHTML =
			'<div class="preview-empty">No variables found</div>';
		return;
	}

	const html = `
		<div class="variable-list">
			${data.variables
				.map(
					(v) => `
				<div class="variable-item">
					<span class="variable-name">${v.name}</span>
					<span class="variable-type ${v.type.toLowerCase()}">${v.type}</span>
				</div>
			`,
				)
				.join("")}
		</div>
	`;

	importPreview.innerHTML = html;
}

/**
 * Handle import button click
 */
function handleImport(): void {
	try {
		const data = JSON.parse(jsonInput.value) as FigmaExportFormat;
		parent.postMessage({ pluginMessage: { type: "import", data } }, "*");
		importBtn.disabled = true;
	} catch (error) {
		showStatus(importStatus, "error", "Failed to parse JSON");
	}
}

/**
 * Request collections from the plugin
 */
function requestCollections(): void {
	parent.postMessage({ pluginMessage: { type: "get-collections" } }, "*");
}

/**
 * Handle export button click
 */
function handleExport(): void {
	const collectionId = collectionSelect.value || undefined;
	parent.postMessage({ pluginMessage: { type: "export", collectionId } }, "*");
	exportBtn.disabled = true;
}

/**
 * Handle copy button click
 */
function handleCopy(): void {
	const text = exportOutput.value;
	if (!text) return;

	navigator.clipboard.writeText(text).then(() => {
		const originalText = copyBtn.textContent;
		copyBtn.textContent = "Copied!";
		setTimeout(() => {
			copyBtn.textContent = originalText;
		}, 2000);
	});
}

/**
 * Update collections dropdown
 */
function updateCollections(newCollections: Collection[]): void {
	collections = newCollections;

	if (collections.length === 0) {
		collectionSelect.innerHTML =
			'<option value="">No collections found</option>';
		exportBtn.disabled = true;
		return;
	}

	collectionSelect.innerHTML = collections
		.map(
			(c) =>
				`<option value="${c.id}">${c.name} (${c.variableCount} variables)</option>`,
		)
		.join("");

	exportBtn.disabled = false;
}

/**
 * Show a status message
 */
function showStatus(
	element: HTMLElement,
	type: "success" | "error",
	message: string,
): void {
	element.textContent = message;
	element.className = `status visible ${type}`;
}

/**
 * Hide a status message
 */
function hideStatus(element: HTMLElement): void {
	element.className = "status";
}

/**
 * Handle messages from the plugin
 */
window.onmessage = (event: MessageEvent) => {
	const msg = event.data.pluginMessage;
	if (!msg) return;

	switch (msg.type) {
		case "set-mode":
			switchTab(msg.mode);
			break;

		case "collections":
			updateCollections(msg.collections);
			break;

		case "import-complete":
			showStatus(
				importStatus,
				"success",
				`Successfully imported ${msg.result.variablesCreated} variables to "${msg.result.collection}"`,
			);
			importBtn.disabled = false;
			break;

		case "export-complete":
			exportOutput.value = JSON.stringify(msg.result, null, 2);
			showStatus(
				exportStatus,
				"success",
				`Exported ${msg.result.variables.length} variables from "${msg.result.collection}"`,
			);
			exportBtn.disabled = false;
			copyBtn.disabled = false;
			break;

		case "error":
			if (currentMode === "import") {
				showStatus(importStatus, "error", msg.message);
				importBtn.disabled = false;
			} else {
				showStatus(exportStatus, "error", msg.message);
				exportBtn.disabled = false;
			}
			break;
	}
};

// Initialize when DOM is ready
init();
