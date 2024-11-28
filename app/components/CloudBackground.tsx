import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const CloudBackground: React.FC = () => {
  // Variables for the number of columns and rows
  let cols: number, rows: number;
  const scl = 5; // Scale of each "cloud pixel"
  let zoff = 0.0; // Offset for Perlin noise movement
  let isAnimating = false;
  let lastMouseX = -1, lastMouseY = -1, lastMoveTime = 0;
  const stopDelay = 500;

  // Color variables
  let baseR: number, baseG: number, baseB: number;
  let targetR: number, targetG: number, targetB: number;
  const yellowR = 255, yellowG = 255, yellowB = 204;
  const colorSpeed = 0.01;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    console.log("Setup called");
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    cols = Math.floor(p5.width / scl);
    rows = Math.floor(p5.height / scl);
    setBaseBackgroundColor(p5);
    initializeTargetColors();
  };

  const draw = (p5: p5Types) => {
    console.log("Draw called");
    console.log(`Canvas size: ${p5.width}x${p5.height}`); // Log canvas size

    // Clear the canvas
    p5.clear(0, 0, 0, 0); // Clear with transparency

    // Apply radial gradient over the whole canvas
    applyRadialGradient(p5);

    // Detect mouse movement and update animation state
    if (p5.mouseX !== lastMouseX || p5.mouseY !== lastMouseY) {
      lastMouseX = p5.mouseX;
      lastMouseY = p5.mouseY;
      lastMoveTime = p5.millis();
      isAnimating = true;

      // Update target colors based on mouse movement
      updateTargetColors(p5);
    } else if (p5.millis() - lastMoveTime > stopDelay) {
      isAnimating = false;
    }

    // Draw clouds on top of the gradient
    drawClouds(p5);

    // Animate clouds if interaction occurs
    if (isAnimating) {
      zoff += 0.01;
    }
  };

  const applyRadialGradient = (p5: p5Types) => {
    p5.loadPixels(); // Load pixels for direct manipulation

    // Get the center and maximum distance from the center
    const cx = p5.width / 2;
    const cy = p5.height / 2;
    const maxDist = p5.dist(0, 0, cx, cy);

    // Loop over each pixel of the canvas
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        // Calculate the distance from the center
        let distance = p5.dist(x, y, cx, cy);

        // Calculate intensity based on the distance
        let intensity = p5.map(distance, 0, maxDist, 1, 0);
        intensity = p5.constrain(intensity, 0, 1); // Constrain between 0 and 1

        // Interpolate colors based on intensity
        let r1 = p5.lerp(baseR, targetR, intensity);
        let g1 = p5.lerp(baseG, targetG, intensity);
        let b1 = p5.lerp(baseB, targetB, intensity);

        // Blend in a yellow tint for a warm effect
        let r = p5.lerp(r1, yellowR, 0.5 * intensity);
        let g = p5.lerp(g1, yellowG, 0.5 * intensity);
        let b = p5.lerp(b1, yellowB, 0.5 * intensity);

        // Set pixel colors
        const pixelIndex = (x + y * p5.width) * 4; // Index for RGBA channels
        p5.pixels[pixelIndex] = r;
        p5.pixels[pixelIndex + 1] = g;
        p5.pixels[pixelIndex + 2] = b;
        p5.pixels[pixelIndex + 3] = 255; // Full opacity
      }
    }

    p5.updatePixels(); // Update the canvas with modified pixels
  };

  const updateTargetColors = (p5: p5Types) => {
    const mouseRatioX = p5.map(p5.mouseX, 0, p5.width, 0, 1);
    const mouseRatioY = p5.map(p5.mouseY, 0, p5.height, 0, 1);

    // Map mouse movement to color ranges
    targetR = p5.map(mouseRatioX, 0, 1, 200, 255);
    targetG = p5.map(mouseRatioY, 0, 1, 180, 255);
    targetB = p5.map(mouseRatioX + mouseRatioY, 0, 2, 200, 255);
  };

  const drawClouds = (p5: p5Types) => {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let xoff = x * 0.05;
        let yoff = y * 0.05;
        let noiseValue = p5.noise(xoff, yoff, zoff);

        if (noiseValue > 0.5) {
          let bright = p5.map(noiseValue, 0.5, 1, 220, 255);
          p5.noStroke();
          p5.fill(bright);
          p5.rect(x * scl, y * scl, scl, scl);
        }
      }
    }
  };

  const setBaseBackgroundColor = (p5: p5Types) => {
    // Set random starting colors
    baseR = p5.random(180, 255);
    baseG = p5.random(180, 255);
    baseB = p5.random(180, 255);
  };

  const initializeTargetColors = () => {
    targetR = 255;
    targetG = 255;
    targetB = 255;
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    cols = Math.floor(p5.width / scl);
    rows = Math.floor(p5.height / scl);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
    />
  );
};

export default CloudBackground;
