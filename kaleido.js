function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let slices = 12;
  let angle = 360 / slices;

  stroke(255);

  for (let i = 0; i < slices; i++) {
    rotate(angle);
    line(0, 0, 300, 0);
  }
}
