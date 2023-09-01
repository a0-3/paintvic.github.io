const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clearButton = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const brushSizeInput = document.getElementById("brushSize");
const eraserButton = document.getElementById("eraser");

let isDrawing = false;
let currentColor = "#000000";
let currentBrushSize = 5;
let isRainbowMode = false;

function toggleRainbowMode() {
  isRainbowMode = !isRainbowMode;
  if (isRainbowMode) {
    eraserButton.textContent = "Stop Rainbow";
    startRainbowMode();
  } else {
    eraserButton.textContent = "Rainbow";
  }
}

function startRainbowMode() {
  let hue = 0;

  const rainbowInterval = setInterval(() => {
    currentColor = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 2) % 360;

    if (!isRainbowMode) {
      clearInterval(rainbowInterval);
      eraserButton.textContent = "Rainbow";
    }
  }, 30);
}

eraserButton.addEventListener("click", toggleRainbowMode);

canvas.width = 600;
canvas.height = 400;

function startPosition(e) {
  isDrawing = true;
  draw(e);
}

function endPosition() {
  isDrawing = false;
  context.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  context.lineWidth = currentBrushSize;
  context.lineCap = "round";
  context.strokeStyle = currentColor;

  context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
  context.stroke();
  context.beginPath();
  context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener("click", clearCanvas);
colorPicker.addEventListener("change", (e) => (currentColor = e.target.value));
brushSizeInput.addEventListener("input", (e) => (currentBrushSize = e.target.value));

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseout", endPosition);
