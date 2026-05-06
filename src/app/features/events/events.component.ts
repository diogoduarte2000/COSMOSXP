import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ThreeEngineService } from '@core/services/three-engine.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('eventsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private threeEngine = inject(ThreeEngineService);
  private controls!: OrbitControls;
  private material!: THREE.ShaderMaterial;
  private clock = new THREE.Clock();
  private particles!: THREE.Points;

  ngAfterViewInit(): void {
    this.initScene();
  }

  ngOnDestroy(): void {
    this.threeEngine.stopLoop();
  }

  private async initScene(): Promise<void> {
    this.threeEngine.initScene(this.canvasRef.nativeElement);
    const scene = this.threeEngine.getScene();
    const camera = this.threeEngine.getCamera();
    const renderer = this.threeEngine.getRenderer();

    camera.position.set(0, 0, 10);
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;

    // Black Hole Accretion Disk
    const [vert, frag] = await Promise.all([
      fetch('shaders/blackhole.vert').then(r => r.text()),
      fetch('shaders/blackhole.frag').then(r => r.text())
    ]);

    const geometry = new THREE.PlaneGeometry(10, 10);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      side: THREE.DoubleSide
    });

    const blackHole = new THREE.Mesh(geometry, this.material);
    blackHole.rotation.x = -Math.PI / 2.5;
    scene.add(blackHole);

    // Particle Stream (Sucked into the black hole)
    this.initParticles();

    this.threeEngine.startLoop(() => {
      this.controls.update();
      const time = this.clock.getElapsedTime();
      
      if (this.material) {
        this.material.uniforms['uTime'].value = time;
      }

      if (this.particles) {
        const positions = this.particles.geometry.attributes['position'].array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          // Move towards center
          positions[i] *= 0.99;
          positions[i+1] *= 0.99;
          positions[i+2] *= 0.99;

          // Reset if too close
          if (Math.abs(positions[i]) < 0.1) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i+1] = (Math.random() - 0.5) * 20;
            positions[i+2] = (Math.random() - 0.5) * 20;
          }
        }
        this.particles.geometry.attributes['position'].needsUpdate = true;
      }
    });
  }

  private initParticles(): void {
    const count = 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.threeEngine.addToScene(this.particles);
  }
}
