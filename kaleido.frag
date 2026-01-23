#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

// Rotación 2D
mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

// Color Dodge seguro
vec3 colorDodge(vec3 base, vec3 blend) {
  blend = clamp(blend, 0.0, 0.92);
  return base / (1.0 - blend);
}

void main() {

  // =========================
  // Coordenadas normalizadas
  // =========================
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // =========================
  // Kaleidoscopio real
  // =========
