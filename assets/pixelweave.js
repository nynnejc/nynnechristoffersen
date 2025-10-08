let stitches;
let loomSize = 14;
let warps, wefts;
let patternWidth = 44;
let patternHeight = 37;
let pixelColors; 

function setup() {
  createDynamicCanvas();

  warps = Math.ceil(width / loomSize) + patternWidth;
  wefts = Math.ceil(height / loomSize) + patternHeight;

  initializeStitches();
  fillPatterns();
}

function draw() {
  background(255, 255, 255);
  drawGrid();
  drawPattern();
  drawHoverEffect();
}

function createDynamicCanvas() {
  let bodyHeight = document.body.scrollHeight;
  let cnv = createCanvas(windowWidth, bodyHeight);
  cnv.position(0, 0);
  cnv.style('z-index', '-1');
  cnv.style('position', 'absolute');
}

function initializeStitches() {
  stitches = new Array(warps);
  pixelColors = new Array(warps);
  for (let x = 0; x < warps; x++) {
    stitches[x] = new Array(wefts).fill(false);
    pixelColors[x] = new Array(wefts).fill(null); 
  }
}

function fillPatterns() {
  for (let x = 0; x < warps; x += patternWidth) {
    for (let y = 0; y < wefts; y += patternHeight) {
      addPattern(x, y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, document.body.scrollHeight);

  warps = Math.ceil(width / loomSize) + patternWidth;
  wefts = Math.ceil(height / loomSize) + patternHeight;

  initializeStitches();
  fillPatterns();
}

function drawPattern() {
  noStroke();
  for (let i = 0; i < warps; i++) {
    for (let j = 0; j < wefts; j++) {
      if (stitches[i][j]) {
        fill(pixelColors[i][j] || color(147, 233, 190));
        square(i * loomSize, j * loomSize, loomSize);
      }
    }
  }
}

function drawHoverEffect() {
  let t = millis() * 0.001;
  let radius = 10;

  let mWarp = Math.floor(mouseX / loomSize);
  let mWeft = Math.floor(mouseY / loomSize);

  for (let i = 0; i < warps; i++) {
    for (let j = 0; j < wefts; j++) {
      if (stitches[i][j]) {
        let dx = i - mWarp;
        let dy = j - mWeft;
        if (sqrt(dx * dx + dy * dy) <= radius) {
          let r = 200 + 45 * sin(t + i + j);
          let g = 20 + 10 * sin(t + i + j);
          let b = 60 + 80 * sin(t * 1.4 + i + j);
          pixelColors[i][j] = color(r, g, b, 50);
        }
      }
    }
  }
}

function drawGrid() {
  stroke(225);
  for (let x = 0; x < width; x += loomSize) line(x, 0, x, height);
  for (let y = 0; y < height; y += loomSize) line(0, y, width, y);
}

function mousePressed() {
  let mWarp = Math.floor(mouseX / loomSize);
  let mWeft = Math.floor(mouseY / loomSize);
  if (mWarp >= 0 && mWarp < warps && mWeft >= 0 && mWeft < wefts) {
    stitches[mWarp][mWeft] = !stitches[mWarp][mWeft];
  }
}

function addPixel(warp, weft) {
  if (warp >= 0 && warp < warps && weft >= 0 && weft < wefts) {
    stitches[warp][weft] = true;
  }
}


function addPattern(xOffset, yOffset) {
  // row 1
  addPixel(xOffset + 2, yOffset + 0);
  addPixel(xOffset + 5, yOffset + 0);
  addPixel(xOffset + 8, yOffset + 0);
  addPixel(xOffset + 15, yOffset + 0);
  addPixel(xOffset + 16, yOffset + 0);
  addPixel(xOffset + 17, yOffset + 0);
  addPixel(xOffset + 19, yOffset + 0);
  addPixel(xOffset + 20, yOffset + 0);
  addPixel(xOffset + 21, yOffset + 0);
  addPixel(xOffset + 28, yOffset + 0);
  addPixel(xOffset + 31, yOffset + 0);
  addPixel(xOffset + 34, yOffset + 0);
  addPixel(xOffset + 38, yOffset + 0);
  addPixel(xOffset + 41, yOffset + 0);
  addPixel(xOffset + 44, yOffset + 0);

  //row 2
  addPixel(xOffset + 1, yOffset + 1);
  addPixel(xOffset + 4, yOffset + 1);
  addPixel(xOffset + 7, yOffset + 1);
  addPixel(xOffset + 12, yOffset + 1);
  addPixel(xOffset + 13, yOffset + 1);
  addPixel(xOffset + 14, yOffset + 1);
  addPixel(xOffset + 22, yOffset + 1);
  addPixel(xOffset + 23, yOffset + 1);
  addPixel(xOffset + 24, yOffset + 1);
  addPixel(xOffset + 29, yOffset + 1);
  addPixel(xOffset + 32, yOffset + 1);
  addPixel(xOffset + 35, yOffset + 1);
  addPixel(xOffset + 37, yOffset + 1);
  addPixel(xOffset + 40, yOffset + 1);
  addPixel(xOffset + 43, yOffset + 1);

  // row 3
  addPixel(xOffset + 0, yOffset + 2);
  addPixel(xOffset + 3, yOffset + 2);
  addPixel(xOffset + 6, yOffset + 2);
  addPixel(xOffset + 9, yOffset + 2);
  addPixel(xOffset + 10, yOffset + 2);
  addPixel(xOffset + 11, yOffset + 2);
  addPixel(xOffset + 18, yOffset + 2);
  addPixel(xOffset + 25, yOffset + 2);
  addPixel(xOffset + 26, yOffset + 2);
  addPixel(xOffset + 27, yOffset + 2);
  addPixel(xOffset + 30, yOffset + 2);
  addPixel(xOffset + 33, yOffset + 2);
  addPixel(xOffset + 36, yOffset + 2);
  addPixel(xOffset + 39, yOffset + 2);
  addPixel(xOffset + 42, yOffset + 2);

  //row 4
  addPixel(xOffset + 2, yOffset + 3);
  addPixel(xOffset + 5, yOffset + 3);
  addPixel(xOffset + 8, yOffset + 3);
  addPixel(xOffset + 15, yOffset + 3);
  addPixel(xOffset + 16, yOffset + 3);
  addPixel(xOffset + 17, yOffset + 3);
  addPixel(xOffset + 19, yOffset + 3);
  addPixel(xOffset + 20, yOffset + 3);
  addPixel(xOffset + 21, yOffset + 3);
  addPixel(xOffset + 28, yOffset + 3);
  addPixel(xOffset + 31, yOffset + 3);
  addPixel(xOffset + 34, yOffset + 3);
  addPixel(xOffset + 38, yOffset + 3);
  addPixel(xOffset + 41, yOffset + 3);
  addPixel(xOffset + 44, yOffset + 3);

  //row 5
  addPixel(xOffset + 1, yOffset + 4);
  addPixel(xOffset + 4, yOffset + 4);
  addPixel(xOffset + 7, yOffset + 4);
  addPixel(xOffset + 12, yOffset + 4);
  addPixel(xOffset + 13, yOffset + 4);
  addPixel(xOffset + 14, yOffset + 4);
  addPixel(xOffset + 22, yOffset + 4);
  addPixel(xOffset + 23, yOffset + 4);
  addPixel(xOffset + 24, yOffset + 4);
  addPixel(xOffset + 29, yOffset + 4);
  addPixel(xOffset + 32, yOffset + 4);
  addPixel(xOffset + 35, yOffset + 4);
  addPixel(xOffset + 37, yOffset + 4);
  addPixel(xOffset + 40, yOffset + 4);
  addPixel(xOffset + 43, yOffset + 4);

  //row 6 (like 3)
  addPixel(xOffset + 0, yOffset + 5);
  addPixel(xOffset + 0, yOffset + 5);
  addPixel(xOffset + 3, yOffset + 5);
  addPixel(xOffset + 6, yOffset + 5);
  addPixel(xOffset + 9, yOffset + 5);
  addPixel(xOffset + 10, yOffset + 5);
  addPixel(xOffset + 11, yOffset + 5);
  addPixel(xOffset + 18, yOffset + 5);
  addPixel(xOffset + 25, yOffset + 5);
  addPixel(xOffset + 26, yOffset + 5);
  addPixel(xOffset + 27, yOffset + 5);
  addPixel(xOffset + 30, yOffset + 5);
  addPixel(xOffset + 33, yOffset + 5);
  addPixel(xOffset + 36, yOffset + 5);
  addPixel(xOffset + 39, yOffset + 5);
  addPixel(xOffset + 42, yOffset + 5);

  //row 7 (like 1)
  addPixel(xOffset + 2, yOffset + 6);
  addPixel(xOffset + 5, yOffset + 6);
  addPixel(xOffset + 8, yOffset + 6);
  addPixel(xOffset + 15, yOffset + 6);
  addPixel(xOffset + 16, yOffset + 6);
  addPixel(xOffset + 17, yOffset + 6);
  addPixel(xOffset + 19, yOffset + 6);
  addPixel(xOffset + 20, yOffset + 6);
  addPixel(xOffset + 21, yOffset + 6);
  addPixel(xOffset + 28, yOffset + 6);
  addPixel(xOffset + 31, yOffset + 6);
  addPixel(xOffset + 34, yOffset + 6);
  addPixel(xOffset + 38, yOffset + 6);
  addPixel(xOffset + 41, yOffset + 6);
  addPixel(xOffset + 44, yOffset + 6);

  //row 8 (like 2)
  addPixel(xOffset + 1, yOffset + 7);
  addPixel(xOffset + 4, yOffset + 7);
  addPixel(xOffset + 7, yOffset + 7);
  addPixel(xOffset + 12, yOffset + 7);
  addPixel(xOffset + 13, yOffset + 7);
  addPixel(xOffset + 14, yOffset + 7);
  addPixel(xOffset + 22, yOffset + 7);
  addPixel(xOffset + 23, yOffset + 7);
  addPixel(xOffset + 24, yOffset + 7);
  addPixel(xOffset + 29, yOffset + 7);
  addPixel(xOffset + 32, yOffset + 7);
  addPixel(xOffset + 35, yOffset + 7);
  addPixel(xOffset + 37, yOffset + 7);
  addPixel(xOffset + 40, yOffset + 7);
  addPixel(xOffset + 43, yOffset + 7);

  //row 9 (like 3)
  addPixel(xOffset + 0, yOffset + 8);
  addPixel(xOffset + 0, yOffset + 8);
  addPixel(xOffset + 3, yOffset + 8);
  addPixel(xOffset + 6, yOffset + 8);
  addPixel(xOffset + 9, yOffset + 8);
  addPixel(xOffset + 10, yOffset + 8);
  addPixel(xOffset + 11, yOffset + 8);
  addPixel(xOffset + 18, yOffset + 8);
  addPixel(xOffset + 25, yOffset + 8);
  addPixel(xOffset + 26, yOffset + 8);
  addPixel(xOffset + 27, yOffset + 8);
  addPixel(xOffset + 30, yOffset + 8);
  addPixel(xOffset + 33, yOffset + 8);
  addPixel(xOffset + 36, yOffset + 8);
  addPixel(xOffset + 39, yOffset + 8);
  addPixel(xOffset + 42, yOffset + 8);

  //row 10 (like 4)
  addPixel(xOffset + 2, yOffset + 9);
  addPixel(xOffset + 5, yOffset + 9);
  addPixel(xOffset + 8, yOffset + 9);
  addPixel(xOffset + 15, yOffset + 9);
  addPixel(xOffset + 16, yOffset + 9);
  addPixel(xOffset + 17, yOffset + 9);
  addPixel(xOffset + 19, yOffset + 9);
  addPixel(xOffset + 20, yOffset + 9);
  addPixel(xOffset + 21, yOffset + 9);
  addPixel(xOffset + 28, yOffset + 9);
  addPixel(xOffset + 31, yOffset + 9);
  addPixel(xOffset + 34, yOffset + 9);
  addPixel(xOffset + 38, yOffset + 9);
  addPixel(xOffset + 41, yOffset + 9);
  addPixel(xOffset + 44, yOffset + 9);

  //row 11 (like 4)
  addPixel(xOffset + 2, yOffset + 10);
  addPixel(xOffset + 5, yOffset + 10);
  addPixel(xOffset + 8, yOffset + 10);
  addPixel(xOffset + 15, yOffset + 10);
  addPixel(xOffset + 16, yOffset + 10);
  addPixel(xOffset + 17, yOffset + 10);
  addPixel(xOffset + 19, yOffset + 10);
  addPixel(xOffset + 20, yOffset + 10);
  addPixel(xOffset + 21, yOffset + 10);
  addPixel(xOffset + 28, yOffset + 10);
  addPixel(xOffset + 31, yOffset + 10);
  addPixel(xOffset + 34, yOffset + 10);
  addPixel(xOffset + 38, yOffset + 10);
  addPixel(xOffset + 41, yOffset + 10);
  addPixel(xOffset + 44, yOffset + 10);

  //row 12 (like 4)
  addPixel(xOffset + 2, yOffset + 11);
  addPixel(xOffset + 5, yOffset + 11);
  addPixel(xOffset + 8, yOffset + 11);
  addPixel(xOffset + 15, yOffset + 11);
  addPixel(xOffset + 16, yOffset + 11);
  addPixel(xOffset + 17, yOffset + 11);
  addPixel(xOffset + 19, yOffset + 11);
  addPixel(xOffset + 20, yOffset + 11);
  addPixel(xOffset + 21, yOffset + 11);
  addPixel(xOffset + 28, yOffset + 11);
  addPixel(xOffset + 31, yOffset + 11);
  addPixel(xOffset + 34, yOffset + 11);
  addPixel(xOffset + 38, yOffset + 11);
  addPixel(xOffset + 41, yOffset + 11);
  addPixel(xOffset + 44, yOffset + 11);

  //row 13 (like 2)
  addPixel(xOffset + 1, yOffset + 12);
  addPixel(xOffset + 4, yOffset + 12);
  addPixel(xOffset + 7, yOffset + 12);
  addPixel(xOffset + 12, yOffset + 12);
  addPixel(xOffset + 13, yOffset + 12);
  addPixel(xOffset + 14, yOffset + 12);
  addPixel(xOffset + 22, yOffset + 12);
  addPixel(xOffset + 23, yOffset + 12);
  addPixel(xOffset + 24, yOffset + 12);
  addPixel(xOffset + 29, yOffset + 12);
  addPixel(xOffset + 32, yOffset + 12);
  addPixel(xOffset + 35, yOffset + 12);
  addPixel(xOffset + 37, yOffset + 12);
  addPixel(xOffset + 40, yOffset + 12);
  addPixel(xOffset + 43, yOffset + 12);

  //row 14 (like 2)
  addPixel(xOffset + 1, yOffset + 13);
  addPixel(xOffset + 4, yOffset + 13);
  addPixel(xOffset + 7, yOffset + 13);
  addPixel(xOffset + 12, yOffset + 13);
  addPixel(xOffset + 13, yOffset + 13);
  addPixel(xOffset + 14, yOffset + 13);
  addPixel(xOffset + 22, yOffset + 13);
  addPixel(xOffset + 23, yOffset + 13);
  addPixel(xOffset + 24, yOffset + 13);
  addPixel(xOffset + 29, yOffset + 13);
  addPixel(xOffset + 32, yOffset + 13);
  addPixel(xOffset + 35, yOffset + 13);
  addPixel(xOffset + 37, yOffset + 13);
  addPixel(xOffset + 40, yOffset + 13);
  addPixel(xOffset + 43, yOffset + 13);

  //row 15 (like 2)
  addPixel(xOffset + 1, yOffset + 14);
  addPixel(xOffset + 4, yOffset + 14);
  addPixel(xOffset + 7, yOffset + 14);
  addPixel(xOffset + 12, yOffset + 14);
  addPixel(xOffset + 13, yOffset + 14);
  addPixel(xOffset + 14, yOffset + 14);
  addPixel(xOffset + 22, yOffset + 14);
  addPixel(xOffset + 23, yOffset + 14);
  addPixel(xOffset + 24, yOffset + 14);
  addPixel(xOffset + 29, yOffset + 14);
  addPixel(xOffset + 32, yOffset + 14);
  addPixel(xOffset + 35, yOffset + 14);
  addPixel(xOffset + 37, yOffset + 14);
  addPixel(xOffset + 40, yOffset + 14);
  addPixel(xOffset + 43, yOffset + 14);

  //row 16 (like 3)
  addPixel(xOffset + 0, yOffset + 15);
  addPixel(xOffset + 0, yOffset + 15);
  addPixel(xOffset + 3, yOffset + 15);
  addPixel(xOffset + 6, yOffset + 15);
  addPixel(xOffset + 9, yOffset + 15);
  addPixel(xOffset + 10, yOffset + 15);
  addPixel(xOffset + 11, yOffset + 15);
  addPixel(xOffset + 18, yOffset + 15);
  addPixel(xOffset + 25, yOffset + 15);
  addPixel(xOffset + 26, yOffset + 15);
  addPixel(xOffset + 27, yOffset + 15);
  addPixel(xOffset + 30, yOffset + 15);
  addPixel(xOffset + 33, yOffset + 15);
  addPixel(xOffset + 36, yOffset + 15);
  addPixel(xOffset + 39, yOffset + 15);
  addPixel(xOffset + 42, yOffset + 15);

  //row 17 (like 3)
  addPixel(xOffset + 0, yOffset + 16);
  addPixel(xOffset + 0, yOffset + 16);
  addPixel(xOffset + 3, yOffset + 16);
  addPixel(xOffset + 6, yOffset + 16);
  addPixel(xOffset + 9, yOffset + 16);
  addPixel(xOffset + 10, yOffset + 16);
  addPixel(xOffset + 11, yOffset + 16);
  addPixel(xOffset + 18, yOffset + 16);
  addPixel(xOffset + 25, yOffset + 16);
  addPixel(xOffset + 26, yOffset + 16);
  addPixel(xOffset + 27, yOffset + 16);
  addPixel(xOffset + 30, yOffset + 16);
  addPixel(xOffset + 33, yOffset + 16);
  addPixel(xOffset + 36, yOffset + 16);
  addPixel(xOffset + 39, yOffset + 16);
  addPixel(xOffset + 42, yOffset + 16);

  //row 18 (like 3)
  addPixel(xOffset + 0, yOffset + 17);
  addPixel(xOffset + 0, yOffset + 17);
  addPixel(xOffset + 3, yOffset + 17);
  addPixel(xOffset + 6, yOffset + 17);
  addPixel(xOffset + 9, yOffset + 17);
  addPixel(xOffset + 10, yOffset + 17);
  addPixel(xOffset + 11, yOffset + 17);
  addPixel(xOffset + 18, yOffset + 17);
  addPixel(xOffset + 25, yOffset + 17);
  addPixel(xOffset + 26, yOffset + 17);
  addPixel(xOffset + 27, yOffset + 17);
  addPixel(xOffset + 30, yOffset + 17);
  addPixel(xOffset + 33, yOffset + 17);
  addPixel(xOffset + 36, yOffset + 17);
  addPixel(xOffset + 39, yOffset + 17);
  addPixel(xOffset + 42, yOffset + 17);

  //row 19 (like 1)
  addPixel(xOffset + 2, yOffset + 18);
  addPixel(xOffset + 5, yOffset + 18);
  addPixel(xOffset + 8, yOffset + 18);
  addPixel(xOffset + 15, yOffset + 18);
  addPixel(xOffset + 16, yOffset + 18);
  addPixel(xOffset + 17, yOffset + 18);
  addPixel(xOffset + 19, yOffset + 18);
  addPixel(xOffset + 20, yOffset + 18);
  addPixel(xOffset + 21, yOffset + 18);
  addPixel(xOffset + 28, yOffset + 18);
  addPixel(xOffset + 31, yOffset + 18);
  addPixel(xOffset + 34, yOffset + 18);
  addPixel(xOffset + 37, yOffset + 18);
  addPixel(xOffset + 40, yOffset + 18);
  addPixel(xOffset + 43, yOffset + 18);

  //row 20 (like 3)
  addPixel(xOffset + 0, yOffset + 19);
  addPixel(xOffset + 0, yOffset + 19);
  addPixel(xOffset + 3, yOffset + 19);
  addPixel(xOffset + 6, yOffset + 19);
  addPixel(xOffset + 9, yOffset + 19);
  addPixel(xOffset + 10, yOffset + 19);
  addPixel(xOffset + 11, yOffset + 19);
  addPixel(xOffset + 18, yOffset + 19);
  addPixel(xOffset + 25, yOffset + 19);
  addPixel(xOffset + 26, yOffset + 19);
  addPixel(xOffset + 27, yOffset + 19);
  addPixel(xOffset + 30, yOffset + 19);
  addPixel(xOffset + 33, yOffset + 19);
  addPixel(xOffset + 36, yOffset + 19);
  addPixel(xOffset + 39, yOffset + 19);
  addPixel(xOffset + 42, yOffset + 19);

  //row 21 (like 3)
  addPixel(xOffset + 0, yOffset + 20);
  addPixel(xOffset + 0, yOffset + 20);
  addPixel(xOffset + 3, yOffset + 20);
  addPixel(xOffset + 6, yOffset + 20);
  addPixel(xOffset + 9, yOffset + 20);
  addPixel(xOffset + 10, yOffset + 20);
  addPixel(xOffset + 11, yOffset + 20);
  addPixel(xOffset + 18, yOffset + 20);
  addPixel(xOffset + 25, yOffset + 20);
  addPixel(xOffset + 26, yOffset + 20);
  addPixel(xOffset + 27, yOffset + 20);
  addPixel(xOffset + 30, yOffset + 20);
  addPixel(xOffset + 33, yOffset + 20);
  addPixel(xOffset + 36, yOffset + 20);
  addPixel(xOffset + 39, yOffset + 20);
  addPixel(xOffset + 42, yOffset + 20);

  //row 23 (like 3)
  addPixel(xOffset + 0, yOffset + 21);
  addPixel(xOffset + 0, yOffset + 21);
  addPixel(xOffset + 3, yOffset + 21);
  addPixel(xOffset + 6, yOffset + 21);
  addPixel(xOffset + 9, yOffset + 21);
  addPixel(xOffset + 10, yOffset + 21);
  addPixel(xOffset + 11, yOffset + 21);
  addPixel(xOffset + 18, yOffset + 21);
  addPixel(xOffset + 25, yOffset + 21);
  addPixel(xOffset + 26, yOffset + 21);
  addPixel(xOffset + 27, yOffset + 21);
  addPixel(xOffset + 30, yOffset + 21);
  addPixel(xOffset + 33, yOffset + 21);
  addPixel(xOffset + 36, yOffset + 21);
  addPixel(xOffset + 39, yOffset + 21);
  addPixel(xOffset + 42, yOffset + 21);

  //row 24 (like 2)
  addPixel(xOffset + 1, yOffset + 22);
  addPixel(xOffset + 4, yOffset + 22);
  addPixel(xOffset + 7, yOffset + 22);
  addPixel(xOffset + 12, yOffset + 22);
  addPixel(xOffset + 13, yOffset + 22);
  addPixel(xOffset + 14, yOffset + 22);
  addPixel(xOffset + 22, yOffset + 22);
  addPixel(xOffset + 23, yOffset + 22);
  addPixel(xOffset + 24, yOffset + 22);
  addPixel(xOffset + 29, yOffset + 22);
  addPixel(xOffset + 32, yOffset + 22);
  addPixel(xOffset + 35, yOffset + 22);
  addPixel(xOffset + 37, yOffset + 22);
  addPixel(xOffset + 40, yOffset + 22);
  addPixel(xOffset + 43, yOffset + 22);

  //row 25 (like 2)
  addPixel(xOffset + 1, yOffset + 23);
  addPixel(xOffset + 4, yOffset + 23);
  addPixel(xOffset + 7, yOffset + 23);
  addPixel(xOffset + 12, yOffset + 23);
  addPixel(xOffset + 13, yOffset + 23);
  addPixel(xOffset + 14, yOffset + 23);
  addPixel(xOffset + 22, yOffset + 23);
  addPixel(xOffset + 23, yOffset + 23);
  addPixel(xOffset + 24, yOffset + 23);
  addPixel(xOffset + 29, yOffset + 23);
  addPixel(xOffset + 32, yOffset + 23);
  addPixel(xOffset + 35, yOffset + 23);
  addPixel(xOffset + 37, yOffset + 23);
  addPixel(xOffset + 40, yOffset + 23);
  addPixel(xOffset + 43, yOffset + 23);

  //row 26 (like 2)
  addPixel(xOffset + 1, yOffset + 24);
  addPixel(xOffset + 4, yOffset + 24);
  addPixel(xOffset + 7, yOffset + 24);
  addPixel(xOffset + 12, yOffset + 24);
  addPixel(xOffset + 13, yOffset + 24);
  addPixel(xOffset + 14, yOffset + 24);
  addPixel(xOffset + 22, yOffset + 24);
  addPixel(xOffset + 23, yOffset + 24);
  addPixel(xOffset + 24, yOffset + 24);
  addPixel(xOffset + 29, yOffset + 24);
  addPixel(xOffset + 32, yOffset + 24);
  addPixel(xOffset + 35, yOffset + 24);
  addPixel(xOffset + 37, yOffset + 24);
  addPixel(xOffset + 40, yOffset + 24);
  addPixel(xOffset + 43, yOffset + 24);

  //row 27 (like 4)
  addPixel(xOffset + 2, yOffset + 25);
  addPixel(xOffset + 5, yOffset + 25);
  addPixel(xOffset + 8, yOffset + 25);
  addPixel(xOffset + 15, yOffset + 25);
  addPixel(xOffset + 16, yOffset + 25);
  addPixel(xOffset + 17, yOffset + 25);
  addPixel(xOffset + 19, yOffset + 25);
  addPixel(xOffset + 20, yOffset + 25);
  addPixel(xOffset + 21, yOffset + 25);
  addPixel(xOffset + 28, yOffset + 25);
  addPixel(xOffset + 31, yOffset + 25);
  addPixel(xOffset + 34, yOffset + 25);
  addPixel(xOffset + 38, yOffset + 25);
  addPixel(xOffset + 41, yOffset + 25);
  addPixel(xOffset + 44, yOffset + 25);

  //row 28 (like 4)
  addPixel(xOffset + 2, yOffset + 26);
  addPixel(xOffset + 5, yOffset + 26);
  addPixel(xOffset + 8, yOffset + 26);
  addPixel(xOffset + 15, yOffset + 26);
  addPixel(xOffset + 16, yOffset + 26);
  addPixel(xOffset + 17, yOffset + 26);
  addPixel(xOffset + 19, yOffset + 26);
  addPixel(xOffset + 20, yOffset + 26);
  addPixel(xOffset + 21, yOffset + 26);
  addPixel(xOffset + 28, yOffset + 26);
  addPixel(xOffset + 31, yOffset + 26);
  addPixel(xOffset + 34, yOffset + 26);
  addPixel(xOffset + 38, yOffset + 26);
  addPixel(xOffset + 41, yOffset + 26);
  addPixel(xOffset + 44, yOffset + 26);

  //row 29 (like 4)
  addPixel(xOffset + 2, yOffset + 27);
  addPixel(xOffset + 5, yOffset + 27);
  addPixel(xOffset + 8, yOffset + 27);
  addPixel(xOffset + 15, yOffset + 27);
  addPixel(xOffset + 16, yOffset + 27);
  addPixel(xOffset + 17, yOffset + 27);
  addPixel(xOffset + 19, yOffset + 27);
  addPixel(xOffset + 20, yOffset + 27);
  addPixel(xOffset + 21, yOffset + 27);
  addPixel(xOffset + 28, yOffset + 27);
  addPixel(xOffset + 31, yOffset + 27);
  addPixel(xOffset + 34, yOffset + 27);
  addPixel(xOffset + 38, yOffset + 27);
  addPixel(xOffset + 41, yOffset + 27);
  addPixel(xOffset + 44, yOffset + 27);

  // row 30 (like 3)
  addPixel(xOffset + 0, yOffset + 28);
  addPixel(xOffset + 0, yOffset + 28);
  addPixel(xOffset + 3, yOffset + 28);
  addPixel(xOffset + 6, yOffset + 28);
  addPixel(xOffset + 9, yOffset + 28);
  addPixel(xOffset + 10, yOffset + 28);
  addPixel(xOffset + 11, yOffset + 28);
  addPixel(xOffset + 18, yOffset + 28);
  addPixel(xOffset + 25, yOffset + 28);
  addPixel(xOffset + 26, yOffset + 28);
  addPixel(xOffset + 27, yOffset + 28);
  addPixel(xOffset + 30, yOffset + 28);
  addPixel(xOffset + 33, yOffset + 28);
  addPixel(xOffset + 36, yOffset + 28);
  addPixel(xOffset + 39, yOffset + 28);
  addPixel(xOffset + 42, yOffset + 28);

  //row 31 (like 2)
  addPixel(xOffset + 1, yOffset + 29);
  addPixel(xOffset + 4, yOffset + 29);
  addPixel(xOffset + 7, yOffset + 29);
  addPixel(xOffset + 12, yOffset + 29);
  addPixel(xOffset + 13, yOffset + 29);
  addPixel(xOffset + 14, yOffset + 29);
  addPixel(xOffset + 22, yOffset + 29);
  addPixel(xOffset + 23, yOffset + 29);
  addPixel(xOffset + 24, yOffset + 29);
  addPixel(xOffset + 29, yOffset + 29);
  addPixel(xOffset + 32, yOffset + 29);
  addPixel(xOffset + 35, yOffset + 29);
  addPixel(xOffset + 37, yOffset + 29);
  addPixel(xOffset + 40, yOffset + 29);
  addPixel(xOffset + 43, yOffset + 29);

  //row 32 (like 1)
  addPixel(xOffset + 2, yOffset + 30);
  addPixel(xOffset + 5, yOffset + 30);
  addPixel(xOffset + 8, yOffset + 30);
  addPixel(xOffset + 15, yOffset + 30);
  addPixel(xOffset + 16, yOffset + 30);
  addPixel(xOffset + 17, yOffset + 30);
  addPixel(xOffset + 19, yOffset + 30);
  addPixel(xOffset + 20, yOffset + 30);
  addPixel(xOffset + 21, yOffset + 30);
  addPixel(xOffset + 28, yOffset + 30);
  addPixel(xOffset + 31, yOffset + 30);
  addPixel(xOffset + 34, yOffset + 30);
  addPixel(xOffset + 38, yOffset + 30);
  addPixel(xOffset + 41, yOffset + 30);
  addPixel(xOffset + 44, yOffset + 30);

  // row 33 (like 3)
  addPixel(xOffset + 0, yOffset + 31);
  addPixel(xOffset + 0, yOffset + 31);
  addPixel(xOffset + 3, yOffset + 31);
  addPixel(xOffset + 6, yOffset + 31);
  addPixel(xOffset + 9, yOffset + 31);
  addPixel(xOffset + 10, yOffset + 31);
  addPixel(xOffset + 11, yOffset + 31);
  addPixel(xOffset + 18, yOffset + 31);
  addPixel(xOffset + 25, yOffset + 31);
  addPixel(xOffset + 26, yOffset + 31);
  addPixel(xOffset + 27, yOffset + 31);
  addPixel(xOffset + 30, yOffset + 31);
  addPixel(xOffset + 33, yOffset + 31);
  addPixel(xOffset + 36, yOffset + 31);
  addPixel(xOffset + 39, yOffset + 31);
  addPixel(xOffset + 42, yOffset + 31);

  //row 34 (like 2)
  addPixel(xOffset + 1, yOffset + 32);
  addPixel(xOffset + 4, yOffset + 32);
  addPixel(xOffset + 7, yOffset + 32);
  addPixel(xOffset + 12, yOffset + 32);
  addPixel(xOffset + 13, yOffset + 32);
  addPixel(xOffset + 14, yOffset + 32);
  addPixel(xOffset + 22, yOffset + 32);
  addPixel(xOffset + 23, yOffset + 32);
  addPixel(xOffset + 24, yOffset + 32);
  addPixel(xOffset + 29, yOffset + 32);
  addPixel(xOffset + 32, yOffset + 32);
  addPixel(xOffset + 35, yOffset + 32);
  addPixel(xOffset + 37, yOffset + 32);
  addPixel(xOffset + 40, yOffset + 32);
  addPixel(xOffset + 43, yOffset + 32);

  //row 35 (like 1)
  addPixel(xOffset + 2, yOffset + 33);
  addPixel(xOffset + 5, yOffset + 33);
  addPixel(xOffset + 8, yOffset + 33);
  addPixel(xOffset + 15, yOffset + 33);
  addPixel(xOffset + 16, yOffset + 33);
  addPixel(xOffset + 17, yOffset + 33);
  addPixel(xOffset + 19, yOffset + 33);
  addPixel(xOffset + 20, yOffset + 33);
  addPixel(xOffset + 21, yOffset + 33);
  addPixel(xOffset + 28, yOffset + 33);
  addPixel(xOffset + 31, yOffset + 33);
  addPixel(xOffset + 34, yOffset + 33);
  addPixel(xOffset + 38, yOffset + 33);
  addPixel(xOffset + 41, yOffset + 33);
  addPixel(xOffset + 44, yOffset + 33);

  // row 36 (like 3)
  addPixel(xOffset + 0, yOffset + 34);
  addPixel(xOffset + 0, yOffset + 34);
  addPixel(xOffset + 3, yOffset + 34);
  addPixel(xOffset + 6, yOffset + 34);
  addPixel(xOffset + 9, yOffset + 34);
  addPixel(xOffset + 10, yOffset + 34);
  addPixel(xOffset + 11, yOffset + 34);
  addPixel(xOffset + 18, yOffset + 34);
  addPixel(xOffset + 25, yOffset + 34);
  addPixel(xOffset + 26, yOffset + 34);
  addPixel(xOffset + 27, yOffset + 34);
  addPixel(xOffset + 30, yOffset + 34);
  addPixel(xOffset + 33, yOffset + 34);
  addPixel(xOffset + 36, yOffset + 34);
  addPixel(xOffset + 39, yOffset + 34);
  addPixel(xOffset + 42, yOffset + 34);

  //row 37 (like 2)
  addPixel(xOffset + 1, yOffset + 35);
  addPixel(xOffset + 4, yOffset + 35);
  addPixel(xOffset + 7, yOffset + 35);
  addPixel(xOffset + 12, yOffset + 35);
  addPixel(xOffset + 13, yOffset + 35);
  addPixel(xOffset + 14, yOffset + 35);
  addPixel(xOffset + 22, yOffset + 35);
  addPixel(xOffset + 23, yOffset + 35);
  addPixel(xOffset + 24, yOffset + 35);
  addPixel(xOffset + 29, yOffset + 35);
  addPixel(xOffset + 32, yOffset + 35);
  addPixel(xOffset + 35, yOffset + 35);
  addPixel(xOffset + 37, yOffset + 35);
  addPixel(xOffset + 40, yOffset + 35);
  addPixel(xOffset + 43, yOffset + 35);

  //row 38 (like 1)
  addPixel(xOffset + 2, yOffset + 36);
  addPixel(xOffset + 5, yOffset + 36);
  addPixel(xOffset + 8, yOffset + 36);
  addPixel(xOffset + 15, yOffset + 36);
  addPixel(xOffset + 16, yOffset + 36);
  addPixel(xOffset + 17, yOffset + 36);
  addPixel(xOffset + 19, yOffset + 36);
  addPixel(xOffset + 20, yOffset + 36);
  addPixel(xOffset + 21, yOffset + 36);
  addPixel(xOffset + 28, yOffset + 36);
  addPixel(xOffset + 31, yOffset + 36);
  addPixel(xOffset + 34, yOffset + 36);
  addPixel(xOffset + 38, yOffset + 36);
  addPixel(xOffset + 41, yOffset + 36);
  addPixel(xOffset + 44, yOffset + 36);
  
    //row 39 (like 1)
  addPixel(xOffset + 2, yOffset + 37);
  addPixel(xOffset + 5, yOffset + 37);
  addPixel(xOffset + 8, yOffset + 37);
  addPixel(xOffset + 15, yOffset + 37);
  addPixel(xOffset + 16, yOffset + 37);
  addPixel(xOffset + 17, yOffset + 37);
  addPixel(xOffset + 19, yOffset + 37);
  addPixel(xOffset + 20, yOffset + 37);
  addPixel(xOffset + 21, yOffset + 37);
  addPixel(xOffset + 28, yOffset + 37);
  addPixel(xOffset + 31, yOffset + 37);
  addPixel(xOffset + 34, yOffset + 37);
  addPixel(xOffset + 38, yOffset + 37);
  addPixel(xOffset + 41, yOffset + 37);
  addPixel(xOffset + 44, yOffset + 37);
}
