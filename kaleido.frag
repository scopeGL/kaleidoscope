#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_mode;

vec2 kaleido(vec2 uv, float slices) {
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float tau = 6.28318530718;

  a = mod(a, tau / slices);
  a = abs(a - tau * 0.5 / slices);

  return vec2(cos(a), sin(a)) * r;
}

float edgeEnhance(float v, float sharpness) {
  return smoothstep(0.5 - sharpness, 0.5 + sharpness, v);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  float slices = (u_mode == 0)
    ? 12.0
    : 36.0;

  uv = kaleido(uv, slices);

  // Base patterns (más frecuencia = más nitidez)
  float p1 = sin(uv.x * 20.0 + u_time);
  float p2 = sin(uv.y * 20.0 - u_time);
  float p3 = sin(length(uv) * 30.0);

  // Aristas ópticas
  float e1 = edgeEnhance(p1, 0.02);
  float e2 = edgeEnhance(p2, 0.02);
  float e3 = edgeEnhance(p3, 0.02);

  vec3 color = vec3(e1, e2, e3);

  // Vidrio pulido vs facetado
  if (u_mode == 0) {
    color = pow(color, vec3(0.8)); // más contraste
  } else {
    color = floor(color * 8.0) / 8.0; // facetas duras
  }

  gl_FragColor = vec4(color, 1.0);
}
