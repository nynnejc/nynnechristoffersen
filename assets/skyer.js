const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;

const tileCount = 310; 
const noiseScale = 0.02;

let noiseVector = { x: 0, y: 0 };
let noiseVelocity = { x: 0.03, y: 0 }; // faster, like p5 version
let noiseAcceleration = { 
  x: Math.random() * 0.01 - 0.005, 
  y: Math.random() * 0.01 - 0.005 
};

class Perlin {
  constructor() {
    this.perm = new Uint8Array(512);
    this.p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) this.p[i] = i;
    for (let i = 255; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
  }
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t, a, b) { return a + t * (b - a); }
  grad(hash, x, y) {
    let h = hash & 3;
    let u = h < 2 ? x : y;
    let v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  noise(x, y) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    let u = this.fade(x);
    let v = this.fade(y);
    let A = this.perm[X] + Y;
    let B = this.perm[X + 1] + Y;
    return this.lerp(v,
      this.lerp(u, this.grad(this.perm[A], x, y),
                   this.grad(this.perm[B], x - 1, y)),
      this.lerp(u, this.grad(this.perm[A + 1], x, y - 1),
                   this.grad(this.perm[B + 1], x - 1, y - 1))
    ) * 0.5 + 0.5;
  }
}
const perlin = new Perlin();

function mapValue(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function draw() {
  ctx.fillStyle = "rgb(150, 180, 255)";
  ctx.fillRect(0, 0, width, height);

  // update velocity and vector like p5 version
  noiseVelocity.x += noiseAcceleration.x;
  noiseVelocity.y += noiseAcceleration.y;
  noiseVector.x -= noiseVelocity.x;
  noiseVector.y -= noiseVelocity.y;

  noiseAcceleration.x = (Math.random() * 0.001 - 0.0005);
  noiseAcceleration.y = (Math.random() * 0.001 - 0.0005);

  let tileWidth = width / tileCount;
  let tileHeight = height / tileCount;

  for (let row = 0; row < tileCount; row++) {
    for (let col = 0; col < tileCount; col++) {
      let x = col * tileWidth;
      let y = row * tileHeight;

      let xnoise = noiseVector.x + col * noiseScale;
      let ynoise = noiseVector.y + row * noiseScale;
      let noiseValue = perlin.noise(xnoise, ynoise);

      let a = mapValue(noiseValue, 0, 0.5, 0, 210);
      ctx.fillStyle = `rgba(252, 230, 252, ${a/255})`;
      ctx.fillRect(x, y, tileWidth + 1, tileHeight + 1);
    }
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
