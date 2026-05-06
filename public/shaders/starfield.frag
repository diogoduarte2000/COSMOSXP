varying float vBrightness;

void main() {
    // Circle shape
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Glow effect
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    gl_FragColor = vec4(vec3(1.0, 1.0, 1.0) * vBrightness, alpha);
}
