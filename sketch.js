function draw() {
  shader(kaleidoShader);

  kaleidoShader.setUniform('u_resolution', [width, height]);
  kaleidoShader.setUniform('u_time', millis() / 1000.0);

  rect(-width / 2, -height / 2, width, height);
}
