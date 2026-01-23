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

// Color Dodge real
vec3 colorDodge(vec3 base, vec3 blend) {
  return base / max(vec3(0.01), (1.0 - blend));
}

void main() {
  // Normalización
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Kaleidoscopio
  float slices = 12.0;
  float sliceAngle = PI * 2.0 / slices;
  a = mod(a, sliceAngle);
  a = abs(a - sliceAngle * 0.5);

  vec2 p = vec2(cos(a), sin(a)) * r;

  // Movimiento fluido tipo vidrio
  p *= rot(u_time * 0.15);
  p += 0.25 * vec2(
    sin(p.y * 4.0 + u_time),
    cos(p.x * 4.0 - u_time)
  );

  // Campos de luz
  float g1 = exp(-length(p * 1.5));
  float g2 = exp(-length((p + 0.35) * 2.5));
  float g3 = exp(-length((p - 0.25) * 3.5));

  vec3 colA = vec3(0.15, 0.55, 1.0) * g1;
  vec3 colB = vec3(1.0, 0.25, 0.7) * g2;
  vec3 colC = vec3(0.3, 1.0, 0.6) * g3;

  vec3 base = colA + colB;
  vec3 light = colC;

  // Color Dodge
  vec3 color = colorDodge(base, light);

  // Viñeta suave
  float vignette = smoothstep(1.2, 0.3, r);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
