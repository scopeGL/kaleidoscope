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
  return max(g.x, g.y);
}

// Color Dodge real (controlado)
vec3 colorDodge(vec3 base, vec3 blend) {
  return base / max(vec3(0.001), (1.0 - blend));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  float slices = (u_mode == 0) ? 12.0 : 36.0;
  uv = kaleido(uv, slices);

  // Facetas con arista dura
  float f = facet(uv + vec2(sin(u_time)*0.15), 9.0);
  float edge = smoothstep(0.18, 0.03, f);

  // Capas de color (frecuencias distintas)
  vec3 base = vec3(
    sin(uv.x * 6.0 + u_time),
    sin(uv.y * 6.0 - u_time),
    sin(length(uv) * 10.0)
  ) * 0.5 + 0.5;

  vec3 blend = vec3(
    sin(uv.y * 9.0 - u_time * 1.2),
    sin(uv.x * 9.0 + u_time * 0.8),
    sin(length(uv) * 14.0 + u_time)
  ) * 0.5 + 0.5;

  // Color Dodge óptico
  vec3 color = colorDodge(base, blend);

  // Aplicar facetas (clave para nitidez)
  color *= edge;

  // Control de brillo (evita quemado)
  color = min(color, vec3(1.0));

  // Contraste final tipo cristal
  color = pow(color, vec3(0.65));

  gl_FragColor = vec4(color, 1.0);
}
