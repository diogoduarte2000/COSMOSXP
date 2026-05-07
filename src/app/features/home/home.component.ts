import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as THREE from 'three';
import gsap from 'gsap';
import { ThreeEngineService } from '@core/services/three-engine.service';

// Shaders are loaded via fetch at runtime from public/shaders/

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('homeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private threeEngine = inject(ThreeEngineService);
  private router = inject(Router);
  
  private starMaterial!: THREE.ShaderMaterial;
  private stars!: THREE.Points;
  private clock = new THREE.Clock();
  
  public isLaunching = false;

  ngAfterViewInit(): void {
    this.initScene().then(() => {
      this.animateEntrance();
    });
  }

  ngOnDestroy(): void {
    this.threeEngine.stopLoop();
  }

  private async initScene(): Promise<void> {
    this.threeEngine.initScene(this.canvasRef.nativeElement);
    
    // Load shaders
    const [starfieldVert, starfieldFrag] = await Promise.all([
      fetch('shaders/starfield.vert').then(res => res.text()),
      fetch('shaders/starfield.frag').then(res => res.text())
    ]);

    const count = 50000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      seeds[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    this.starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uWarpSpeed: { value: 0.1 }
      },
      vertexShader: starfieldVert,
      fragmentShader: starfieldFrag,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.stars = new THREE.Points(geometry, this.starMaterial);
    this.threeEngine.addToScene(this.stars);

    this.threeEngine.startLoop(() => {
      this.starMaterial.uniforms['uTime'].value = this.clock.getElapsedTime();
    });

    window.addEventListener('resize', () => this.threeEngine.onResize());
  }

  private animateEntrance(): void {
    gsap.from('.logo', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out'
    });

    gsap.from('.subtitle, .launch-hint, .launch-btn', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
      duration: 1,
      ease: 'power2.out'
    });
  }

  public onLaunch(): void {
    if (this.isLaunching) return;
    this.isLaunching = true;

    // Warp speed animation
    gsap.to(this.starMaterial.uniforms['uWarpSpeed'], {
      value: 15.0,
      duration: 1.2,
      ease: 'power2.in'
    });

    // Fade out UI
    gsap.to('.ui-overlay', {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        setTimeout(() => {
          this.router.navigate(['/solar-system']);
        }, 400);
      }
    });
  }
}
