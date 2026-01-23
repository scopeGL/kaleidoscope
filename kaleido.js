let img;

function preload() {
  img = loadImage('imagen.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let slices = 12;
  let angle = 360 / slices;

  for (let i = 0; i < slices; i++) {
    rotate(angle);
    push();
    scale(1, i % 2 === 0 ? 1 : -1);
    image(img, 0, 0, 300, 300);
    pop();
  }
}



