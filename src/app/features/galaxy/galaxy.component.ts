import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ThreeEngineService } from '@core/services/three-engine.service';

@Component({
  selector: 'app-galaxy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss']
})
export class GalaxyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('galaxyCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private threeEngine = inject(ThreeEngineService);
  private controls!: OrbitControls;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.ShaderMaterial;
  private points!: THREE.Points;
  private clock = new THREE.Clock();

  public parameters = {
    count: 200000,
    size: 0.01,
    radius: 100,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
  };

  ngAfterViewInit(): void {
    this.initScene();
  }

  ngOnDestroy(): void {
    this.threeEngine.stopLoop();
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
  }

  private async initScene(): Promise<void> {
    this.threeEngine.initScene(this.canvasRef.nativeElement);
    const scene = this.threeEngine.getScene();
    const camera = this.threeEngine.getCamera();
    const renderer = this.threeEngine.getRenderer();

    camera.position.set(50, 50, 100);
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;

    // Shaders
    const [vert, frag] = await Promise.all([
      fetch('shaders/galaxy.vert').then(r => r.text()),
      fetch('shaders/galaxy.frag').then(r => r.text())
    ]);

    this.generateGalaxy(vert, frag);

    this.threeEngine.startLoop(() => {
      this.controls.update();
      if (this.material) {
        this.material.uniforms['uTime'].value = this.clock.getElapsedTime();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.travelToCenter();
    });
  }

  private generateGalaxy(vert: string, frag: string): void {
    if (this.points) {
      this.geometry.dispose();
      this.material.dispose();
      this.threeEngine.getScene().remove(this.points);
    }

    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    const scales = new Float32Array(this.parameters.count);
    const randomness = new Float32Array(this.parameters.count * 3);

    const colorInside = new THREE.Color(this.parameters.insideColor);
    const colorOutside = new THREE.Color(this.parameters.outsideColor);

    for (let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * this.parameters.radius;
      const spinAngle = radius * this.parameters.spin;
      const branchAngle = ((i % this.parameters.branches) / this.parameters.branches) * Math.PI * 2;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

      // Randomness
      const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      // Color
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / this.parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Scale
      scales[i] = Math.random();
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30 * this.threeEngine.getRenderer().getPixelRatio() }
      },
      vertexShader: vert,
      fragmentShader: frag
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.threeEngine.addToScene(this.points);
  }

  private travelToCenter(): void {
    const camera = this.threeEngine.getCamera();
    gsap.to(camera.position, {
      x: 0.1,
      y: 0.1,
      z: 0.1,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.controls.target.set(0, 0, 0);
      }
    });
  }
}
