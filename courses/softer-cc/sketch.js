let bgColors;
let altColors;
let circleRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  setCircleRadius();

  bgColors = {
    tl: '#ebc9f2',  // top-left lilla
    tr: '#F3EEEA',  // top-right hvid
    br: '#F3EEEA',  // bottom-right hvid
    bl: '#FFA4E0'  // bottom-left pink
  };

  altColors = {
    tl: '#F3EEEA',  // hvid
    tr: '#FFA4E0',  // pink
    br: '#FFA4E0',  // pink
    bl: '#FF3B0F'  // rød
  };
}

function draw() {
  clear();

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

  fill(colors.tl); rect(0, 0, midX, height);     
  fill(colors.tr); rect(midX, 0, midX, height);  
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
    drawQuadrants(altColors); 
  } else {
    drawHalves(altColors);  
  }

  drawingContext.restore();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCircleRadius();
}

function setCircleRadius() {
  circleRadius = min(windowWidth, windowHeight) * 0.9;
}
