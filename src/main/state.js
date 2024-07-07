import { prepareDisplayText, loadParagraph } from "../utils/ui.js";
import { config, elements } from "./config.js";
import { getRandomWords } from "../utils/words.js";
import { calculateAccuracy } from "../utils/helpers.js";
import { saveScore, displayScores } from "../utils/storage.js";

export const state = {
  timer: null,
  timeLeft: config.maxTime,
  isTyping: false,
  wordCount: 0,
  text: [],
  currentIndex: 0,
  totalWordsAttempted: 0,
  totalWordsCorrect: 0,
  lastSpaceIndex: -1,
  currentWords: config.wordsCollection.slice(),
};

export async function fetchAndDisplayText(wordsArray = config.wordsCollection) {
  const displayText = prepareDisplayText({ lines: wordsArray });
  loadParagraph(displayText);
  state.apiText = displayText.split(" ");
}

function resetTimer() {
  clearInterval(state.timer);
  state.timer = null;
}

function clearTypingArea() {
  elements.typingText.innerHTML = "";
}

function updateScoresAndResetTest() {
  const accuracy = calculateAccuracy(
    state.totalWordsCorrect,
    state.totalWordsAttempted
  );
  saveScore(state.wordCount, accuracy);
  displayScores();

  elements.inpField.disabled = true;
  setTimeout(() => {
    clearTypingArea();
    resetTest(getRandomWords(100));
  }, 1000);
}

export function startTimer() {
  state.isTyping = true;
  state.timer = setInterval(() => {
    if (state.timeLeft > 0) {
      state.timeLeft--;
      elements.timeTag.innerText = state.timeLeft;
    } else {
      handleTestEnd();
    }
  }, 1000);
}

function handleTestEnd() {
  resetTimer();
  updateScoresAndResetTest();
}

function resetState(wordsArray) {
  clearTypingArea();
  resetTimer();
  state.timeLeft = config.maxTime;
  state.isTyping = false;
  state.wordCount = 0;
  state.currentIndex = 0;
  state.totalWordsAttempted = 0;
  state.totalWordsCorrect = 0;
  state.lastSpaceIndex = -1;
  elements.inpField.value = "";
  elements.timeTag.innerText = state.timeLeft;
  elements.wordsTag.innerText = state.wordCount;
  elements.percentageTag.innerText = "100%";
  state.currentWords = wordsArray;
  elements.inpField.disabled = false;
  fetchAndDisplayText(wordsArray);
}

export function resetTest(wordsArray = config.wordsCollection) {
  resetState(wordsArray);
}
export function restartTest() {
  resetState(state.currentWords);
}
