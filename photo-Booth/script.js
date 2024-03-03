const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const controlContaienr = document.querySelector(".controls");

function getVideo() {
  // get user's video
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
      document.querySelector(".btn-click").style.display = "block";
    })
    .catch((err) => {
      console.error(`OH NO!!!`, err);
      displayErr(err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    ctx.globalAlpha = 0.8;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // Play the sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");

  // Downloading Image
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "image");
  link.innerHTML = `<img src="${data}" alt="Image" />`;

  strip.insertBefore(link, strip.firstChild);
}

function displayErr(err) {
  const errMsg = document.createElement("h1");
  errMsg.textContent = `😐 ${err.message}`;
  errMsg.classList.add("err-msg");
  controlContaienr.appendChild(errMsg);
  document.querySelector(".btn-click").style.display = "none";
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
