let ellipseColor;
let value = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  background(215, 255, 255);
  ellipseColor = color(64, 76, 76);
}

function draw() {
  push();
  translate(mouseX, mouseY);


  fill(red(ellipseColor), green(ellipseColor), blue(ellipseColor), 43);
  noStroke();
  beginShape();
  vertex(0, -50);
  vertex(14, -20);
  vertex(47, -15);
  vertex(23, 7);
  vertex(29, 40);
  vertex(0, 25);
  vertex(-29, 40);
  vertex(-23, 7);
  vertex(-47, -15);
  vertex(-14, -20);
  endShape(CLOSE);

 
  fill(red(ellipseColor), green(ellipseColor), blue(ellipseColor), 63);
  noStroke();
  ellipse(0, 0, 200, 200);

  pop();
}

function keyPressed() {
  ellipseColor = color(random(150, 255), random(150, 255), random(150, 255));
}

function mouseClicked() {
  // Same pastel logic if you want it here too
  ellipseColor = color(random(150, 255), random(150, 255), random(150, 255));
}
