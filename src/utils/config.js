import { getRandomWords } from "./words.js";

export const config = {
  wordsCollection: getRandomWords(70),
  localStorageKey: "typingTestText",
  scoresStorageKey: "typingTestScores",
  maxTime: 60,
  typingTextSelector: ".typing-text p",
  inputFieldSelector: ".container .input-field",
  tryAgainButtonSelector: ".container .try-again-button",
  timeTagSelector: "#seconds",
  wordsTagSelector: "#words",
  mistakeTagSelector: ".statistics-container .mistakes span",
  wpmTagSelector: ".statistics-container .words-per-min span",
  cpmTagSelector: ".statistics-container .chars-per-min span",
  percentageSelector: "#percentage",
  charsPerMinSelector: "#charsPerMin",
};

export const elements = {
  typingText: document.querySelector(config.typingTextSelector),
  inpField: document.querySelector(config.inputFieldSelector),
  tryAgainBtn: document.querySelector(config.tryAgainButtonSelector),
  timeTag: document.querySelector(config.timeTagSelector),
  wordsTag: document.querySelector(config.wordsTagSelector),
  mistakeTag: document.querySelector(config.mistakeTagSelector),
  wpmTag: document.querySelector(config.wpmTagSelector),
  cpmTag: document.querySelector(config.cpmTagSelector),
  percentageTag: document.querySelector(config.percentageSelector),
  charsPerMinTag: document.querySelector(config.charsPerMinSelector),
};
