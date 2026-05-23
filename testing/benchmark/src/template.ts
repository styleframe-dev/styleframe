export function renderDocument(sectionsHtml: string, cssPath: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Styleframe vs Tailwind Benchmark</title>
<link rel="stylesheet" href="${cssPath}">
</head>
<body>
${sectionsHtml}
</body>
</html>
`;
}
