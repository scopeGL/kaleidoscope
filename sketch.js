let kaleidoShader;
let mode = 0; // 0 = vidrio pulido | 1 = facetado extremo

function preload() {
  kaleidoShader = loadShader('kaleido.vert', 'kaleido.frag');
}

function setup() {
  pixelDensity(window.devicePixelRatio || 1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(kaleidoShader);

  kaleidoShader.setUniform(
    'u_resolution',
    [width * pixelDensity(), height * pixelDensity()]
  );

  kaleidoShader.setUniform('u_time', millis() / 1000.0);
  kaleidoShader.setUniform('u_mode', mode);

  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === '1') mode = 0; // vidrio pulido
  if (key === '2') mode = 1; // facetado extremo
}
