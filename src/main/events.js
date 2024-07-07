import { elements } from "./config.js";
import { displayScores } from "../utils/storage.js";
import { getRandomWords } from "../utils/words.js";
import { resetTest, restartTest, fetchAndDisplayText } from "./state.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayText();
  displayScores();
  setupShowScores();

  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      restartTest();
    });

  document.getElementById("resetButton").addEventListener("click", function () {
    resetTest(getRandomWords(100));
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    restartTest();
  } else if (event.key === "Escape") {
    resetTest(getRandomWords(70));
  }
});

export function setupFocusEvents() {
  document.addEventListener("keydown", () => elements.inpField.focus());
  elements.typingText.addEventListener("click", () =>
    elements.inpField.focus()
  );
}

function toggleScoresVisibility() {
  const scoresTableContainer = document.getElementById("scoresTableContainer");
  if (scoresTableContainer) {
    scoresTableContainer.classList.toggle("d-none");
    if (!scoresTableContainer.classList.contains("d-none")) {
      displayScores();
    }
  }
}

export function setupShowScores() {
  const showScoresLink = document.getElementById("showScoresLink");
  if (showScoresLink) {
    showScoresLink.addEventListener("click", function (event) {
      event.preventDefault();
      toggleScoresVisibility();
    });
  }
}
