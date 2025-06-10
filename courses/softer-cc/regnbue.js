let outerRadius = 400;
let growSpeed = 0.2;
let maxRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
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

  // Tegn buerne
  for (let i = 0; i < numBands; i++) {
    let radius = outerRadius - i * bandWidth;
    stroke(colors[i]);
    strokeWeight(bandWidth + 10);
    arc(centerX, centerY, radius * 2, radius * 2, PI, TWO_PI);
  }

  // Animate blur: fra 5 to 15 som regnbue vokser
  let blurAmount = map(outerRadius, 100, maxRadius, 5, 15);
  blurAmount = constrain(blurAmount, 5, 15);
  filter(BLUR, blurAmount);

  // Grow animation
  outerRadius += growSpeed;

  // Reset
  if (outerRadius > maxRadius) {
    outerRadius = 100;
  }
}
