function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // Clave estética "colordodge"
  blendMode(SCREEN);
}

function draw() {
  background(0);

  let slices = 16;                           // más espejos = más refinado
  let angle = 360 / slices;
  let radius = min(width, height) * 0.5;

  // movimiento lento y flotante
  rotateZ(frameCount * 0.02);

  for (let i = 0; i < slices; i++) {
    push();
    rotateZ(i * angle);

    if (i % 2 === 1) {
      scale(1, -1, 1);
    }

    drawSoftWedge(radius, i);
    pop();
  }
}

function drawSoftWedge(r, index) {
  let t = frameCount * 0.2 + index * 30;

  let hue = (200 + t) % 360;     // gama fría-luminosa
  let sat = 50;                  // menos saturación
  let bri = 100;

  fill(hue, sat, bri, 25);       // mucha transparencia

  beginShape();
  vertex(0, 0, 0);

  let steps = 14;                // más puntos = más fluido
  for (let i = 0; i <= steps; i++) {
    let a = map(i, 0, steps, -18, 18);

    let noiseFactor = noise(
      i * 0.15,
      frameCount * 0.01,
      index * 0.1
    );

    let rr = r * (0.4 + noiseFactor * 0.7);
    let z = sin(t * 0.15 + i) * 120;

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
