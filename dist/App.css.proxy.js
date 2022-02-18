// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".container {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tflex-grow: 1;\r\n\toverflow: hidden;\r\n}\r\n\r\n.row {\r\n\tdisplay: grid;\r\n    grid-template-columns: repeat(5, 1fr);\r\n    grid-gap: 10px;\r\n}\r\n\r\n.letter {\r\n\tdisplay: grid;\r\n    grid-gap: 5px;\r\n\r\n}\r\n\r\n.letter input {\r\n\ttext-align: center;\r\n\tfont-size: 20px;\r\n\tborder: 2px grey solid;\r\n\twidth: 40px;\r\n\theight: 40px;\r\n}\r\n\r\n.wordContainer {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tflex-grow: 1;\r\n\toverflow: hidden;\r\n}\r\n\r\n.wordRow {\r\n\tdisplay: grid;\r\n    grid-template-columns: repeat(10, 1fr);\r\n    grid-gap: 10px;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}