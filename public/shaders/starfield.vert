uniform float uTime;
uniform float uWarpSpeed;
attribute float aSeed;
varying float vBrightness;

void main() {
    // Basic position
    vec3 pos = position;
    
    // Warp speed effect: push particles along Z axis based on distance from center
    pos.z += uTime * uWarpSpeed * 100.0 * aSeed;
    
    // Loop position to stay within a range
    pos.z = mod(pos.z + 500.0, 1000.0) - 500.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Pulse brightness
    vBrightness = 0.5 + 0.5 * sin(uTime * 2.0 + aSeed * 10.0);
    
    // Particle size based on distance and seed
    gl_PointSize = (2.0 + 3.0 * aSeed) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
