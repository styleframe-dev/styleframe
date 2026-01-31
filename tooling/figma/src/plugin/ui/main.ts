import type { FigmaExportFormat } from "../../types";
import type { DTCGDocument } from "../../converters/dtcg/types";
import {
	isDTCGFormat,
	extractDTCGVariables,
	type PreviewVariable,
} from "../shared";

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
const fileDropZone = document.getElementById("file-drop-zone")!;
const fileInput = document.getElementById("file-input") as HTMLInputElement;
const fileSelected = document.getElementById("file-selected")!;
const fileName = document.getElementById("file-name")!;
const fileClearBtn = document.getElementById("file-clear-btn")!;
const importBtn = document.getElementById("import-btn") as HTMLButtonElement;
const importPreview = document.getElementById("import-preview")!;
const importStatus = document.getElementById("import-status")!;

// Store the loaded JSON data
let loadedImportData: unknown = null;

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
const downloadBtn = document.getElementById(
	"download-btn",
) as HTMLButtonElement;
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

	// Import handlers - file picker
	fileDropZone.addEventListener("click", () => fileInput.click());
	fileInput.addEventListener("change", handleFileSelect);
	fileClearBtn.addEventListener("click", handleFileClear);
	importBtn.addEventListener("click", handleImport);

	// Drag and drop handlers
	fileDropZone.addEventListener("dragover", handleDragOver);
	fileDropZone.addEventListener("dragleave", handleDragLeave);
	fileDropZone.addEventListener("drop", handleDrop);

	// Export handlers
	refreshBtn.addEventListener("click", requestCollections);
	exportBtn.addEventListener("click", handleExport);
	copyBtn.addEventListener("click", handleCopy);
	downloadBtn.addEventListener("click", handleDownload);

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
 * Handle drag over event
 */
function handleDragOver(e: DragEvent): void {
	e.preventDefault();
	e.stopPropagation();
	fileDropZone.classList.add("drag-over");
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e: DragEvent): void {
	e.preventDefault();
	e.stopPropagation();
	fileDropZone.classList.remove("drag-over");
}

/**
 * Handle drop event
 */
function handleDrop(e: DragEvent): void {
	e.preventDefault();
	e.stopPropagation();
	fileDropZone.classList.remove("drag-over");

	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		const file = files[0];
		if (
			file &&
			(file.type === "application/json" || file.name.endsWith(".json"))
		) {
			processFile(file);
		} else {
			showStatus(importStatus, "error", "Please select a JSON file");
		}
	}
}

/**
 * Handle file input change
 */
function handleFileSelect(): void {
	const file = fileInput.files?.[0];
	if (file) {
		processFile(file);
	}
}

/**
 * Process the selected file
 */
function processFile(file: File): void {
	hideStatus(importStatus);

	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			const content = e.target?.result as string;
			const data = JSON.parse(content);
			const variables = getPreviewVariables(data);

			// Store the data for import
			loadedImportData = data;

			// Show file selected state
			fileDropZone
				.querySelector(".file-drop-content")
				?.setAttribute("hidden", "");
			fileSelected.removeAttribute("hidden");
			fileName.textContent = file.name;

			// Render preview
			renderPreview(variables);
			importBtn.disabled = false;
		} catch (error) {
			const message = error instanceof Error ? error.message : "Invalid JSON";
			importPreview.innerHTML = `<div class="preview-empty" style="color: var(--color-error)">${message}</div>`;
			importBtn.disabled = true;
			loadedImportData = null;
		}
	};

	reader.onerror = () => {
		showStatus(importStatus, "error", "Failed to read file");
		loadedImportData = null;
	};

	reader.readAsText(file);
}

/**
 * Handle clear file button
 */
function handleFileClear(e: Event): void {
	e.stopPropagation();
	fileInput.value = "";
	loadedImportData = null;

	// Reset UI
	fileDropZone.querySelector(".file-drop-content")?.removeAttribute("hidden");
	fileSelected.setAttribute("hidden", "");
	fileName.textContent = "";

	importPreview.innerHTML =
		'<div class="preview-empty">Select a JSON file to preview variables</div>';
	importBtn.disabled = true;
	hideStatus(importStatus);
}

/**
 * Get preview variables from either DTCG or legacy format
 */
function getPreviewVariables(data: unknown): PreviewVariable[] {
	if (typeof data !== "object" || data === null) {
		throw new Error("Invalid format: expected an object");
	}

	if (isDTCGFormat(data)) {
		const variables = extractDTCGVariables(data);
		if (variables.length === 0) {
			throw new Error("No variables found in DTCG format");
		}
		return variables;
	}

	// Legacy format
	const obj = data as FigmaExportFormat;
	if (!Array.isArray(obj.variables)) {
		throw new Error("Invalid format: not a valid DTCG or legacy format");
	}

	return obj.variables.map((v) => ({
		name: v.name,
		type: v.type,
	}));
}

/**
 * Render the variable preview
 */
function renderPreview(variables: PreviewVariable[]): void {
	if (variables.length === 0) {
		importPreview.innerHTML =
			'<div class="preview-empty">No variables found in file</div>';
		return;
	}

	const html = `
		<div class="variable-list">
			${variables
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
	if (!loadedImportData) {
		showStatus(importStatus, "error", "No file loaded");
		return;
	}

	parent.postMessage(
		{ pluginMessage: { type: "import", data: loadedImportData } },
		"*",
	);
	importBtn.disabled = true;
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

	const originalHTML = copyBtn.innerHTML;
	const checkmarkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
		<path d="M20 6L9 17l-5-5" stroke="#14ae5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>`;

	// Try modern clipboard API first, fallback to execCommand
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fallback for Figma plugin sandbox
			const textarea = document.createElement("textarea");
			textarea.value = text;
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			const success = document.execCommand("copy");
			document.body.removeChild(textarea);
			return success;
		}
	};

	copyToClipboard().then((success) => {
		if (success) {
			copyBtn.innerHTML = checkmarkIcon;
			copyBtn.title = "Copied to clipboard";
			copyBtn.classList.add("copied");
			setTimeout(() => {
				copyBtn.innerHTML = originalHTML;
				copyBtn.title = "Copy";
				copyBtn.classList.remove("copied");
			}, 2000);
		}
	});
}

/**
 * Handle download button click
 */
function handleDownload(): void {
	const text = exportOutput.value;
	if (!text) return;

	const blob = new Blob([text], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "tokens.json";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
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

		case "export-complete": {
			exportOutput.value = JSON.stringify(msg.result, null, 2);
			// Extract variable count and collection from DTCG format
			const exportedVars = extractDTCGVariables(msg.result);
			const collectionName =
				msg.result.$extensions?.["dev.styleframe"]?.collection || "Collection";
			showStatus(
				exportStatus,
				"success",
				`Exported ${exportedVars.length} variables from "${collectionName}"`,
			);
			exportBtn.disabled = false;
			copyBtn.disabled = false;
			downloadBtn.disabled = false;
			break;
		}

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
