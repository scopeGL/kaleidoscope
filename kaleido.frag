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
  a = abs(a - tau / slices * 0.5);
  return vec2(cos(a), sin(a)) * r;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  float slices = (u_mode == 0)
    ? 8.0 + sin(u_time * 0.5) * 2.0        // vidrio pulido
    : 24.0 + sin(u_time * 2.0) * 6.0;      // facetado extremo

  uv = kaleido(uv, slices);

  float c1 = sin(uv.x * 10.0 + u_time);
  float c2 = sin(uv.y * 10.0 - u_time);
  float c3 = sin(length(uv) * 15.0);

  vec3 color = vec3(c1, c2, c3) * 0.5 + 0.5;

  // Vidrio pulido vs facetado
  if (u_mode == 0) {
    color = smoothstep(0.0, 1.0, color);
  } else {
    color = floor(color * 6.0) / 6.0;
  }

  gl_FragColor = vec4(color, 1.0);
}
