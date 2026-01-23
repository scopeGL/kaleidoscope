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

  kaleidoShader.setUniform('u_resolution', [width, height]);
  kaleidoShader.setUniform('u_time', millis() / 1000.0);

  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
