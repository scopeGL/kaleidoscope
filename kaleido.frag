#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_mode;

#define TAU 6.28318530718

vec2 kaleido(vec2 uv, float n) {
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float sector = TAU / n;

  a = mod(a, sector);
  a = abs(a - sector * 0.5);

  return vec2(cos(a), sin(a)) * r;
}

// Faceta geométrica dura
float facet(vec2 p, float scale) {
  p *= scale;
  vec2 g = abs(fract(p) - 0.5);
  float d = max(g.x, g.y);
  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  float slices = (u_mode == 0) ? 12.0 : 36.0;
  uv = kaleido(uv, slices);

  float f = facet(uv + vec2(sin(u_time)*0.2), 8.0);

  // Arista óptica dura
  float edge = smoothstep(0.15, 0.02, f);

  // Color cristalino
  vec3 base = vec3(
    sin(uv.x * 6.0 + u_time),
    sin(uv.y * 6.0 - u_time),
    sin(length(uv) * 10.0)
  ) * 0.5 + 0.5;

  vec3 color = base * edge;

  // Contraste final
  color = pow(color, vec3(0.7));

  gl_FragColor = vec4(color, 1.0);
}
