let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 12; i++) {
    flowers.push(new FallingFlower());
  }
}

function draw() {
  background(207, 201, 244);

  for (let flower of flowers) {
    flower.update();
    flower.display();
  }
}
function drawFlower(x, y, scaleFactor = 1) {
  push();
  translate(x, y);
  scale(scaleFactor);
  fill(255, 220, 243);

  let dx = 60;
  let dy = 0;
  let offsetX = -150;
  let offsetY = -240;

  circle(210 + offsetX, 200 + offsetY, 120);
  circle(120 + offsetX, 200 + offsetY, 120);
  circle(120 + offsetX, 290 + offsetY, 120);
  circle(210 + offsetX, 290 + offsetY, 120);
  circle(150 + offsetX, 240 + offsetY, 100);
  pop();
}


class FallingFlower {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-200, -50);
    this.speed = random(0.2, 2);
    this.scale = random(0.2, 1);
    this.angle = random(TWO_PI);
    this.spin = random(-0.01, 0.01);
  }

  update() {
    this.y += this.speed;
    this.angle += this.spin;

    if (this.y > height + 100) {
      this.reset();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    drawFlower(0, 0, this.scale);
    pop();
  }
}
