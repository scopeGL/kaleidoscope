function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(0);

  let slices = 12;
  let angle = 360 / slices;
  let radius = min(width, height) * 0.45;

  rotateZ(frameCount * 0.15);

  for (let i = 0; i < slices; i++) {
    push();
    rotateZ(i * angle);

    // espejo alternado
    if (i % 2 === 1) {
      scale(1, -1, 1);
    }

    drawWedge(radius, i);
    pop();
  }
}

function drawWedge(r, index) {
  let t = frameCount * 0.5 + index * 20;

  let hue = (t * 2) % 360;
  let sat = 80;
  let bri = 100;

  fill(hue, sat, bri, 80);

  beginShape();
  vertex(0, 0, 0);

  for (let i = 0; i <= 10; i++) {
    let a = map(i, 0, 10, -15, 15);
    let rr = r * noise(i * 0.2, fr
