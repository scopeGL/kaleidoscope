#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define SQRT3 1.73205080757

// Simetría hexagonal (reflexión real)
vec2 hexFold(vec2 p) {
  p.x = abs(p.x);
  p.y = abs(p.y);

  float k = 0.5 * SQRT3;
  float dotp = dot(p, vec2(0.5, k));

  if (dotp > 0.0) {
    p -= 2.0 * dotp * vec2(0.5, k);
  }

  p.x = abs(p.x);
  return p;
}

// Facetas duras
float facet(vec2 p, float scale) {
  p *= scale;
  vec2 g = abs(fract(p) - 0.5);
  return max(g.x, g.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // Zoom óptico lento
  uv *= 1.5 + sin(u_time * 0.3) * 0.1;

  // Aplicar simetría hexagonal
  uv = hexFold(uv);

  // Facetado
  float f = facet(uv, 10.0);
  float edge = smoothstep(0.18, 0.03, f);

  // Campo de color (simple, limpio)
  vec3 color = vec3(
    sin(uv.x * 8.0 + u_time),
    sin(uv.y * 8.0 - u_time),
    sin((uv.x + uv.y) * 6.0)
  ) * 0.5 + 0.5;

  // Aplicar facetas (clave de nitidez)
  color *= edge;

  // Contraste tipo cristal
  color = pow(color, vec3(0.65));

  gl_FragColor = vec4(color, 1.0);
}
