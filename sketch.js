let kaleidoShader;

function preload() {
  kaleidoShader = loadShader('kaleido.vert', 'kaleido.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(kaleidoShader);
  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
