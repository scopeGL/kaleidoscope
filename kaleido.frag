#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

// Color Dodge seguro
vec3 colorDodge(vec3 base, vec3 blend) {
  blend = clamp(blend, 0.0, 0.95);   // 👈 CLAVE
  return base / (1.0 - blend);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Kaleidoscopio
  float slices = 12.0;
  float sa = 2.0 * PI / slices;
  a = mod(a, sa);
  a = abs(a - sa * 0.5);

  vec2 p = vec2(cos(a), sin(a)) * r;

  // Movimiento
  p *= rot(u_time * 0.12);
  p += 0.2 * vec2(
    sin(p.y * 4.0 + u_time),
    cos(p.x * 4.0 - u_time)
  );

  // Campos de luz (limitados)
  float g1 = exp(-length(p * 1.8));
  float g2 = exp(-length((p + 0.3) * 2.8));
  float g3 = exp(-length((p - 0.25) * 3.2));

  vec3 colA = vec3(0.2, 0.6, 1.0) * g1;
  vec3 colB = vec3(1.0, 0.3, 0.8) * g2;
  vec3 colC = vec3(0.3, 1.0, 0.6) * g3;

  vec3 base  = colA + colB;
  vec3 light = colC * 0.8;   // 👈 evita saturación

  vec3 color = colorDodge(base, light);

  float vignette = smoothstep(1.2, 0.3, r);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
