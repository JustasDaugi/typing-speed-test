import { TypingTest } from "./typingTest.js";
import { elements, config } from "../utils/config.js";

document.addEventListener("DOMContentLoaded", function () {
  const typingTest = new TypingTest(config, elements);
  typingTest.init();
});
