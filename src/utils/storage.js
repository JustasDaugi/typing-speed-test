import { config } from "./config.js";

export async function fetchData() {
  const data = {
    lines: config.wordsCollection,
  };
  return data;
}

function displayImprovementNotification(message) {
  const notificationElement = document.createElement("div");
  notificationElement.className = "improvement-notification";
  notificationElement.innerText = message;
  document.body.appendChild(notificationElement);
  setTimeout(() => {
    notificationElement.remove();
  }, 5000);
}

let chart = null;

export function displayScores() {
  // const scoresChartContainer = document.getElementById('scoresChartContainer');
  const scoresChartElement = document.getElementById("scoresChart");
  if (!scoresChartElement) return;
  const scoresChart = scoresChartElement.getContext("2d");
  const scores =
    JSON.parse(localStorage.getItem(config.scoresStorageKey)) || [];

  const attempts =
    scores.length > 0 ? scores.map((_, index) => index + 1) : [0];
  const wpmData =
    scores.length > 0 ? scores.map((score) => score.wordCount) : [0];
  const accuracyData =
    scores.length > 0
      ? scores.map((score) =>
          typeof score.accuracy === "number"
            ? score.accuracy.toFixed(2)
            : "0.00"
        )
      : [0];

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(scoresChart, {
    type: "line",
    data: {
      labels: attempts,
      datasets: [
        {
          label: "Words Per Minute (WPM)",
          data: wpmData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
        },
        {
          label: "Accuracy (%)",
          data: accuracyData,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Attempt",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
}

document
  .getElementById("showScoresLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const scoresChartContainer = document.getElementById(
      "scoresChartContainer"
    );
    if (scoresChartContainer) {
      // Ensure scoresChartContainer is available
      scoresChartContainer.classList.toggle("d-none");
      if (!scoresChartContainer.classList.contains("d-none")) {
        displayScores();
      }
    }
  });

export function saveScore(wordCount, accuracy) {
  const scores =
    JSON.parse(localStorage.getItem(config.scoresStorageKey)) || [];
  accuracy = typeof accuracy === "number" ? accuracy : 0;
  scores.push({ wordCount, accuracy });
  localStorage.setItem(config.scoresStorageKey, JSON.stringify(scores));
  const accuracyText = accuracy.toFixed(2);
  const improvementMessage =
    scores.length > 1
      ? `Previous Score: ${scores[scores.length - 2].wordCount} words, ${scores[
          scores.length - 2
        ].accuracy.toFixed(
          2
        )}% accuracy. Current Score: ${wordCount} words, ${accuracyText}% accuracy.`
      : `This is your first attempt. Current Score: ${wordCount} words, ${accuracyText}% accuracy.`;
  displayImprovementNotification(improvementMessage);
  if (
    !document
      .getElementById("scoresChartContainer")
      .classList.contains("d-none")
  ) {
    displayScores();
  }
}
