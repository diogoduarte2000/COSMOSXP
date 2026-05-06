uniform float uTime;
varying vec2 vUv;

// Simple noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    
    // Event Horizon (Black Center)
    if (dist < 0.15) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    // Accretion Disk
    float angle = atan(uv.y, uv.x);
    float disk = sin(dist * 20.0 - uTime * 5.0 + angle * 2.0);
    disk = smoothstep(0.1, 0.5, disk);
    
    // Color (Orange/Blue gradient)
    vec3 innerColor = vec3(1.0, 0.4, 0.1); // Hot orange
    vec3 outerColor = vec3(0.1, 0.3, 1.0); // Cold blue
    vec3 color = mix(innerColor, outerColor, dist * 2.0);
    
    // Glow and intensity
    float intensity = 0.02 / (dist - 0.14);
    intensity *= (0.8 + 0.2 * noise(uv + uTime));
    
    gl_FragColor = vec4(color * intensity, 1.0);
}
