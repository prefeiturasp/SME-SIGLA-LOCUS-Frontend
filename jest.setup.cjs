require("@testing-library/jest-dom");

// react-router v7 usa TextEncoder/TextDecoder; jsdom nao os expoe por padrao.
const { TextEncoder, TextDecoder } = require("node:util");
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}

// antd usa matchMedia; jsdom nao implementa.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// antd Table/ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom nao implementa getComputedStyle(elt, pseudoElt); rc-table chama com o
// 2o argumento ao medir a scrollbar. Ignora o pseudo-elemento.
const getComputedStyleOriginal = window.getComputedStyle;
window.getComputedStyle = (elt) => getComputedStyleOriginal(elt);
