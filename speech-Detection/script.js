// Support all Browsers
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p); // Append on div container

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  // Display the msg on DOM.
  p.textContent = transcript;

  // Create new paragraph after user takes a break
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

// Restart everytime, after user stops speaking
recognition.addEventListener("end", recognition.start);

// Initial Start
recognition.start();
