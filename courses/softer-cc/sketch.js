let bgColors;
let altColors;
let circleRadius;

function setup() {
  createCanvas(windowWidth, document.body.scrollHeight);
  noStroke();
  setCircleRadius();

  bgColors = {
    tl: '#FFA4E0',  // top-left pink
    tr: '#F3EEEA',  // top-right hvid
    bl: '#ebc9f2',  // bottom-left lilla
    br: '#F3EEEA'   // bottom-right hvid
  };

  altColors = {
    tl: '#FF3B0F',  // rød
    tr: '#FED009',  // gul
    bl: '#FFA4E0',  // pink
    br: '#FED009'   // gul
  };
}

function draw() {
  clear(); // prevent drawing buildup

  if (window.scrollY < 100) {
    drawQuadrants(bgColors);
  } else {
    drawHalves(bgColors);
  }

  drawFilteredCircle();
}

function drawQuadrants(colors) {
  let midX = width / 2;
  let midY = height / 2;

  fill(colors.tl); rect(0, 0, midX, midY);
  fill(colors.tr); rect(midX, 0, midX, midY);
  fill(colors.bl); rect(0, midY, midX, midY);
  fill(colors.br); rect(midX, midY, midX, midY);
}

function drawHalves(colors) {
  let midX = width / 2;

  fill(colors.tl); rect(0, 0, midX, height);      // Left half
  fill(colors.tr); rect(midX, 0, midX, height);   // Right half
}

function drawFilteredCircle() {
  let midX = width / 2;
  let midY = height / 2;

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(mouseX, mouseY, circleRadius / 2, 0, TWO_PI);
  drawingContext.clip();

  if (window.scrollY < 100) {
    drawQuadrants(altColors); // inside circle: alt quadrants
  } else {
    drawHalves(altColors);    // inside circle: alt halves
  }

  drawingContext.restore();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, document.body.scrollHeight);
  setCircleRadius();
}

function setCircleRadius() {
  circleRadius = min(windowWidth, windowHeight) * 0.9;
}
