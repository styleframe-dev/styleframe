import "virtual:styleframe.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1 class="h1">Vite + TypeScript + Styleframe</h1>

  <div id="test-margin" class="_margin:sm">Margin SM</div>
  <div id="test-padding" class="_padding:md">Padding MD</div>
  <div id="test-bg" class="_bg:primary">Background Primary</div>
  <div id="test-text" class="_text:secondary">Text Secondary</div>
  <div id="test-combined" class="_margin:md _padding:sm _bg:secondary _text:primary">Combined</div>
`;
