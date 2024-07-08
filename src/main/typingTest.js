import { fetchAndDisplayText } from "../utils/state.js";
import { setupShowScores } from "../utils/events.js";
import { handleUserInput, handleKeyDown } from "./input.js";
import { displayScores } from "../utils/storage.js";

export class TypingTest {
  constructor(config, elements) {
    this.config = config;
    this.elements = elements;
  }

  async init() {
    this.elements.timeTag.innerText = this.config.maxTime;
    await fetchAndDisplayText();

    this.elements.inpField.addEventListener("input", handleUserInput);
    this.elements.inpField.addEventListener("keydown", handleKeyDown);

    await fetchAndDisplayText();

    displayScores();
    setupShowScores();
  }
}
