let img;

function preload() {
  img = loadImage('imagen.jpg'); // imagen chica, ya comprobada
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  textureMode(NORMAL);
  noStroke();
}

function draw() {
  background(0);

  let slices = 12;
  let angle = 360 / slices;
  let radius = min(width, height) * 0.6;

  rotateZ(frameCount * 0.1);

  for (let i = 0; i < slices; i++) {
    push();
    rotateZ(i * angle);

    if (i % 2 === 1) {
      scale(1, -1, 1);
    }

    beginShape();
    texture(img);

    vertex(0, 0, 0, 0.5, 0.5);
    vertex(radius, -radius, 0, 1, 0);
    vertex(radius, radius, 0, 1, 1);

    endShape(CLOSE);
    pop();
  }
}

