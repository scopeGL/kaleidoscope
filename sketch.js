function draw() {
  shader(kaleidoShader);

  kaleidoShader.setUniform('u_resolution', [width, height]);
  kaleidoShader.setUniform('u_time', millis() / 1000.0);

  rect(0, 0, width, height);
}
