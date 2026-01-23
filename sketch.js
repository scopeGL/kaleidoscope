function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(30);

  translate(width / 2, height / 2);

  let slices = 12;
  let angle = 360 / slices;

  for (let i = 0; i < slices; i++) {
    rotate(angle);
    stroke(255);
    line(0, 0, 300, 0);
  }
}

