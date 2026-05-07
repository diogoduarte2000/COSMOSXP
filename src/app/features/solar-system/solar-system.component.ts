import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ThreeEngineService } from '@core/services/three-engine.service';
import { NasaApiService } from '@core/services/nasa-api.service';
import { PlanetInfoPanelComponent } from '@shared/components/planet-info-panel/planet-info-panel.component';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [CommonModule, PlanetInfoPanelComponent],
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss']
})
export class SolarSystemComponent implements AfterViewInit, OnDestroy {
  @ViewChild('solarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private threeEngine = inject(ThreeEngineService);
  private nasaApi = inject(NasaApiService);
  
  private controls!: OrbitControls;
  private planets: { mesh: THREE.Mesh; data: any; orbitGroup: THREE.Group }[] = [];
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private textureLoader = new THREE.TextureLoader();

  public selectedPlanet = signal<any>(null);
  public isViewingPlanet = signal(false);
  public planetLabels: { name: string; x: number; y: number }[] = [];
  public speedMultiplier = signal(1);

  ngAfterViewInit(): void {
    this.initScene();
  }

  ngOnDestroy(): void {
    this.threeEngine.stopLoop();
    window.removeEventListener('click', this.onMouseClick);
  }

  private initScene(): void {
    this.threeEngine.initScene(this.canvasRef.nativeElement);
    const scene = this.threeEngine.getScene();
    const camera = this.threeEngine.getCamera();
    const renderer = this.threeEngine.getRenderer();

    camera.position.set(0, 50, 150);
    
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Very low ambient for realism
    scene.add(ambientLight);

    // Sun as a powerful PointLight
    const sunLight = new THREE.PointLight(0xffffff, 2, 2000, 0); // Decay 0 for vacuum-like light
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Create Planets
    const planetsData = this.nasaApi.getPlanetsData(); // Don't filter out Sun
    const sunData = planetsData.find(p => p.name === 'Sun');
    
    // Create Sun Mesh
    const sunGeometry = new THREE.SphereGeometry(8, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      map: this.textureLoader.load('textures/sun.png'),
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Add Sun to planets array for labels and clicking
    this.planets.push({ mesh: sun, data: sunData, orbitGroup: new THREE.Group() });

    planetsData.filter(p => p.name !== 'Sun').forEach(data => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
      
      // Map local textures or use fallback
      let texturePath = `textures/${data.name.toLowerCase()}.png`;
      if (data.name === 'Mercury' || data.name === 'Venus' || data.name === 'Saturn' || data.name === 'Uranus' || data.name === 'Neptune') {
        texturePath = 'textures/mars.png'; // Fallback to Mars for now
      }

      const material = new THREE.MeshStandardMaterial({
        map: this.textureLoader.load(texturePath),
        roughness: 0.8,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = data.orbitRadius!;
      mesh.name = data.name;
      orbitGroup.add(mesh);

      // Moons
      if (data.moons) {
        data.moons.forEach((m: any) => {
          const moonGroup = new THREE.Group();
          mesh.add(moonGroup);

          const moonGeo = new THREE.SphereGeometry(m.radius, 16, 16);
          const moonMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.x = m.orbitRadius;
          moonGroup.add(moonMesh);
          
          // Store moon for animation
          (mesh as any).moons = (mesh as any).moons || [];
          (mesh as any).moons.push({ group: moonGroup, speed: m.orbitSpeed });
        });
      }

      // Orbit Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, data.orbitRadius!, data.orbitRadius!, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitLine.rotation.x = Math.PI / 2;
      scene.add(orbitLine);

      // Saturn Rings
      if (data.hasRings) {
        const ringGeo = new THREE.RingGeometry(data.radius + 1, data.radius + 5, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      this.planets.push({ mesh, data, orbitGroup });
    });

    this.threeEngine.startLoop(() => {
      this.controls.update();
      
      const newLabels: { name: string; x: number; y: number }[] = [];
      const camera = this.threeEngine.getCamera();
      const widthHalf = window.innerWidth / 2;
      const heightHalf = window.innerHeight / 2;

      const speed = this.speedMultiplier();

      if (!this.isViewingPlanet()) {
        this.planets.forEach(p => {
          p.orbitGroup.rotation.y += p.data.orbitSpeed * 2 * speed;
          p.mesh.rotation.y += 0.01 * speed;

          // Animate moons
          if ((p.mesh as any).moons) {
            (p.mesh as any).moons.forEach((m: any) => {
              m.group.rotation.y += m.speed * speed;
            });
          }

          // Project label
          const pos = new THREE.Vector3();
          p.mesh.getWorldPosition(pos);
          pos.project(camera);

          if (pos.z < 1) { // Only show if in front of camera
            newLabels.push({
              name: p.data.name,
              x: (pos.x * widthHalf) + widthHalf,
              y: -(pos.y * heightHalf) + heightHalf
            });
          }
        });
      } else {
        const selected = this.planets.find(p => p.data.name === this.selectedPlanet().name);
        if (selected) {
          selected.mesh.rotation.y += 0.01;
        }
      }

      this.planetLabels = newLabels;
    });

    window.addEventListener('click', (e) => this.onMouseClick(e));
  }

  private onMouseClick(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.threeEngine.getCamera());
    const intersects = this.raycaster.intersectObjects(this.planets.map(p => p.mesh));

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const planetData = this.planets.find(p => p.mesh === clickedMesh)?.data;
      if (planetData) {
        this.focusOnPlanet(clickedMesh, planetData);
      }
    }
  }

  private focusOnPlanet(mesh: THREE.Mesh, data: any): void {
    this.selectedPlanet.set(data);
    this.isViewingPlanet.set(true);

    const camera = this.threeEngine.getCamera();
    const targetPos = new THREE.Vector3();
    mesh.getWorldPosition(targetPos);

    const offset = data.radius * 4;

    gsap.to(camera.position, {
      x: targetPos.x + offset,
      y: targetPos.y + offset / 2,
      z: targetPos.z + offset,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.controls.target.copy(targetPos);
      }
    });
  }
  
  public updateSpeed(event: any): void {
    this.speedMultiplier.set(parseFloat(event.target.value));
  }

  public resetView(): void {
    this.selectedPlanet.set(null);
    this.isViewingPlanet.set(false);
    
    gsap.to(this.threeEngine.getCamera().position, {
      x: 0,
      y: 50,
      z: 150,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.controls.target.set(0, 0, 0);
      }
    });
  }
}
