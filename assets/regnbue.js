let outerRadius = 400;
let growSpeed = 0.2;
let maxRadius;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('z-index', '-1');   // behind content
  cnv.style('position', 'fixed');
  noFill();
  maxRadius = max(width * 1.5, height * 1.5); // start forfra når regnbuen er udenfor skærmern
}

function draw() {
  background(255);

  let centerX = 0;
  let centerY = height;

  let numBands = 7;
  let innerRadius = outerRadius * 0.6;
  let bandWidth = (outerRadius - innerRadius) / numBands;

  let colors = [
    color(227, 0, 25),      // Rød
    color(255, 127, 0),     // Orange
    color(255, 255, 0),     // Gul
    color(61, 213, 48),     // Grøn
    color(67, 96, 245),     // Blå
    color(127, 67, 245),    // Indigo
    color(216, 67, 245)     // Violet
  ];

  for (let i = 0; i < numBands; i++) {
    let radius = outerRadius - i * bandWidth;
    stroke(colors[i]);
    strokeWeight(bandWidth + 10);
    arc(centerX, centerY, radius * 2, radius * 2, PI, TWO_PI);
  }

  let blurAmount = map(outerRadius, 100, maxRadius, 5, 15);
  blurAmount = constrain(blurAmount, 5, 15);
  filter(BLUR, blurAmount);

  outerRadius += growSpeed;

  if (outerRadius > maxRadius) {
    outerRadius = 100;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxRadius = max(width * 1.5, height * 1.5);
}
