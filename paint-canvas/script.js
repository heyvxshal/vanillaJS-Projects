const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Setting width and height of canvas
ctx.height = window.innerHeight;
ctx.width = window.innerWidth;

ctx.lineJoin = "round";
ctx.lineCap = "round";

// Default values
let lastX = 0;
let lastY = 0;
let hue = 0;

// Setting initial conditions
let direction = true;
let isDrawing = false;

// Draws on Canvas
function draw(e) {
  if (!isDrawing) return;

  // Start Drawing
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // From
  ctx.lineTo(e.offsetX, e.offsetY); // To
  ctx.stroke();

  // Update starting values
  [lastX, lastY] = [e.offsetX, e.offsetY];

  ctx.strokeStyle = `hsl(${hue},100%,50%)`; // Line Color
  hue++;

  // line thickness

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
