import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planet-info-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="info-panel" *ngIf="planet()">
      <div class="panel-header">
        <h2>{{ planet().name }}</h2>
        <button class="close-btn" (click)="onClose.emit()">×</button>
      </div>
      <div class="panel-content">
        <p class="description">{{ planet().description }}</p>
        
        <div class="detailed-info" *ngIf="planet().details">
          <h3>DADOS CIENTÍFICOS</h3>
          <p>{{ planet().details }}</p>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="label">Raio Relativo</span>
            <span class="value">{{ planet().radius }}x</span>
          </div>
          <div class="stat" *ngIf="planet().orbitRadius">
            <span class="label">Distância Orbital</span>
            <span class="value">{{ planet().orbitRadius }} UA</span>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <button class="view-more">VER MAIS DETALHES</button>
      </div>
    </div>
  `,
  styles: [`
    .info-panel {
      position: fixed;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 350px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(15px);
      border-left: 2px solid rgba(255, 255, 255, 0.2);
      padding: 2rem;
      color: #fff;
      z-index: 1000;
      animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateY(-50%) translateX(100%); opacity: 0; }
      to { transform: translateY(-50%) translateX(0); opacity: 1; }
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        margin: 0;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s;
        &:hover { opacity: 1; }
      }
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }

    .detailed-info {
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 5px;

      h3 {
        font-size: 0.8rem;
        color: #00ffcc;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
      }

      p {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.4;
      }
    }

    .stats {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;

      .stat {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .label { color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; text-transform: uppercase; }
        .value { font-weight: 700; color: #fff; }
      }
    }

    .view-more {
      width: 100%;
      padding: 1rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover { background: #fff; color: #000; }
    }
  `]
})
export class PlanetInfoPanelComponent {
  planet = input<any>();
  onClose = output<void>();
}
