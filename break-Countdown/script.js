let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown); // clear any existing timers
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Stop if reached 0 seconds
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // Displaying
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // Convert to mins, hours
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  // Displaying on UI
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  // Calculate end time
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`; // Display hours in 12 hour format
}

// Button Timers
function startTimer() {
  const seconds = this.dataset.time;
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

// Custom Timer
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
