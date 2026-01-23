function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  blendMode(ADD); // efecto vidrio
}

function draw() {
  background(0);

  let slices = 12;                 // cantidad de espejos
  let angle = 360 / slices;
  let radius = min(width, height) * 0.45;

  // rotación suave global
  rotateZ(frameCount * 0.05);

  for (let i = 0; i < slices; i++) {
    push();
    rotateZ(i * angle);

    // espejo alternado (clave del caleidoscopio)
    if (i % 2 === 1) {
      scale(1, -1, 1);
    }

    drawWedge(radius, i);
    pop();
  }
}

function drawWedge(r, index) {
  let t = frameCount * 0.3 + index * 20;

  let hue = (t * 2) % 360;
  let sat = 70;
  let bri = 100;

  fill(hue, sat, bri, 40);

  beginShape();
  vertex(0, 0, 0);

  let steps = 6; // menos pasos = más facetado (vidrio)
  for (let i = 0; i <= steps; i++) {
    let a = map(i, 0, steps, -15, 15);
    let rr = r * (0.6 + 0.4 * sin(t * 0.5 + i * 2));
    let z = sin(t * 0.3 + i) * 80;

    vertex(
      rr * cos(a),
      rr * sin(a),
      z
    );
  }

  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
