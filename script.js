if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service Worker registered! Scope:", registration.scope);
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn"); // Get the stop button

let count = 0;
let isGoingUp = true;
let interval;

const directionChangeSound = new Audio("changeDirection.mp3");

function startWorkout() {
  startBtn.disabled = true;
  stopBtn.disabled = false; // Enable the stop button when workout starts
  interval = setInterval(() => {
    if (count === 5 && isGoingUp) {
      isGoingUp = false;
      playSound();
    } else if (count === 0 && !isGoingUp) {
      isGoingUp = true;
      playSound();
    }

    timerDisplay.textContent = `00:${count.toString().padStart(2, "0")}`;
    count = isGoingUp ? count + 1 : count - 1;
  }, 1000);
}

function playSound() {
  directionChangeSound.play();
}

function stopWorkout() {
  clearInterval(interval); // Clear the interval to stop the workout
  count = 0; // Reset the counter
  isGoingUp = true; // Reset the direction
  timerDisplay.textContent = "00:00"; // Reset the timer display
  startBtn.disabled = false; // Enable the start button
  stopBtn.disabled = true; // Disable the stop button
}

startBtn.addEventListener("click", startWorkout);
stopBtn.addEventListener("click", stopWorkout); // Add event listener for the stop button
