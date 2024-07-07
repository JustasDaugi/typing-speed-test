import { elements } from "../main/config.js";
import { state, startTimer } from "../main/state.js";
import { highlightCurrentWord, updateAccuracy } from "../utils/helpers.js";

export function handleUserInput() {
  if (!state.isTyping) {
    startTimer();
  }
  const inputValue = elements.inpField.value;
  const spans = elements.typingText.querySelectorAll("span");
  if (inputValue.length > 0) {
    const char = inputValue[inputValue.length - 1];
    const currentSpan = spans[state.currentIndex];
    if (char === currentSpan.innerText) {
      currentSpan.classList.add("correct");
      currentSpan.classList.remove("incorrect");
    } else {
      currentSpan.classList.add("incorrect");
      currentSpan.classList.remove("correct");
    }
    state.currentIndex++;
    elements.inpField.value = "";
    highlightCurrentWord();
  }
}

export function handleKeyDown(event) {
  if (
    event.key === "Backspace" &&
    state.currentIndex > state.lastSpaceIndex + 1
  ) {
    handleBackspace(event);
  } else if (event.key === " ") {
    const spans = elements.typingText.querySelectorAll("span");
    if (spans[state.currentIndex].innerText !== " ") {
      markCurrentWordIncorrect();
      crossOutFollowingLetters(spans);
    } else {
      checkForSpace(event);
    }
    event.preventDefault();
  }
}

function handleBackspace(event) {
  event.preventDefault();
  const spans = elements.typingText.querySelectorAll("span");
  let wordStart = findWordStart(spans);
  if (canMoveBack(wordStart)) {
    moveBack(spans);
  }
}

function findWordStart(spans) {
  let wordStart = state.currentIndex;
  for (let i = state.currentIndex - 1; i >= 0; i--) {
    if (spans[i].innerText === " ") {
      wordStart = i + 1;
      break;
    }
  }
  return wordStart;
}

function canMoveBack(wordStart) {
  return state.currentIndex > wordStart || state.currentIndex > 0;
}

function moveBack(spans) {
  state.currentIndex--;
  const currentSpan = spans[state.currentIndex];
  currentSpan.classList.remove("correct", "incorrect");
}

function checkForSpace() {
  const spans = elements.typingText.querySelectorAll("span");
  const wordEnd = state.currentIndex;
  const wordStart = state.lastSpaceIndex + 1;
  const wordCorrect = isWordCorrect(spans, wordStart, wordEnd);
  if (!wordCorrect) {
    markWordIncorrect(spans, wordStart, wordEnd);
    crossOutFollowingLetters(spans, wordEnd);
  } else {
    incrementWordCount();
  }
  state.lastSpaceIndex = state.currentIndex;
  updateAccuracy(wordCorrect);
  moveToNextWord();
}

function isWordCorrect(spans, start, end) {
  for (let i = start; i < end; i++) {
    if (!spans[i].classList.contains("correct")) {
      return false;
    }
  }
  return true;
}

function markCurrentWordIncorrect() {
  const spans = elements.typingText.querySelectorAll("span");
  const wordStart = state.lastSpaceIndex + 1;
  const wordEnd = state.currentIndex;
  markWordIncorrect(spans, wordStart, wordEnd);
  state.totalWordsAttempted++;
  crossOutFollowingLetters(spans, wordEnd);
  while (
    state.currentIndex < spans.length &&
    spans[state.currentIndex].innerText !== " "
  ) {
    state.currentIndex++;
  }
  state.lastSpaceIndex = state.currentIndex;
  updateAccuracy();
  moveToNextWord();
}

function markWordIncorrect(spans, start, end) {
  for (let i = start; i < end; i++) {
    spans[i].classList.add("crossed-out");
  }
}

function crossOutFollowingLetters(spans, wordEnd) {
  for (let i = wordEnd; i < spans.length; i++) {
    if (spans[i].innerText === " ") break;
    spans[i].classList.add("crossed-out");
  }
}

function incrementWordCount() {
  state.wordCount++;
  elements.wordsTag.innerText = state.wordCount;
}

function moveToNextWord() {
  state.currentIndex = state.lastSpaceIndex + 1;
  highlightCurrentWord();
}
