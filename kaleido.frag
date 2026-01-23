#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

// rotación
mat2 rot(float a){
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

// color dodge real
vec3 colorDodge(vec3 base, vec3 blend) {
  return base / (1.0 - blend);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // kaleidoscopio
  float slices = 12.0;
  a = mod(a, 2.0 * PI / slices);
  a = abs(a - PI / slices);

  vec2 p = vec2(cos(a), sin(a)) * r;

  // deformación fluida
  p *= rot(u_time * 0.15);
  p += 0.15 * vec2(
    sin(p.y * 4.0 + u_time),
    cos(p.x * 4.0 - u_time)
  );

  // campos de luz
  float glow1 = exp(-length(p * 1.5));
  float glow2 = exp(-length((p + 0.3) * 2.5));
  float glow3 = exp(-length((p - 0.2) * 3.5));

  vec3 colA = vec3(0.2, 0.6, 1.0) * glow1;
  vec3 colB = vec3(1.0, 0.3, 0.8) * glow2;
  vec3 colC = vec3(0.3, 1.0, 0.6) * glow3;

  vec3 base = colA + colB;
  vec3 light = colC;

  // COLOR DODGE
  vec3 color = colorDodge(base, light);

  // viñeta suave
  float vignette = smoothstep(1.2, 0.3, r);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
