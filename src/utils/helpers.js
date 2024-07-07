import { elements } from "../main/config.js";
import { state } from "../main/state.js";

export function calculateAccuracy(correctWords, attemptedWords) {
  if (attemptedWords === 0) return 0;
  return (correctWords / attemptedWords) * 100;
}

export function displayAccuracy(accuracy) {
  elements.percentageTag.innerText = accuracy.toFixed(0) + "%";
}

export function highlightCurrentWord() {
  const spans = elements.typingText.querySelectorAll("span");
  const wordStart = state.lastSpaceIndex + 1;
  const wordEnd = state.currentIndex;
  spans.forEach((span) => span.classList.remove("highlight"));
  for (let i = wordStart; i <= wordEnd; i++) {
    if (spans[i]) {
      spans[i].classList.add("highlight");
    }
  }
}

export function updateAccuracy(isWordCorrect) {
  state.totalWordsAttempted++;
  if (isWordCorrect) {
    state.totalWordsCorrect++;
  }
  const accuracy = calculateAccuracy(
    state.totalWordsCorrect,
    state.totalWordsAttempted
  );
  displayAccuracy(accuracy);
}
