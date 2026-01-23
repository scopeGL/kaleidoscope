// kaleido.vert — COMPATIBLE con p5.js

#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
