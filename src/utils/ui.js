import { setupFocusEvents } from "./events.js";

export function prepareDisplayText(data) {
  const text = data.lines.join(" ");
  return text;
}

export function loadParagraph(paragraph) {
  const typingArea = document.getElementById("typingArea");
  typingArea.innerHTML = "";

  const chars = paragraph.split("");
  chars.forEach((char, index) => {
    const span = `<span id="char-${index}">${char}</span>`;
    typingArea.innerHTML += span;
  });

  const spans = typingArea.querySelectorAll("span");
  if (spans.length > 0) {
    spans[0].classList.add("active");
  }
  setupFocusEvents();
}
